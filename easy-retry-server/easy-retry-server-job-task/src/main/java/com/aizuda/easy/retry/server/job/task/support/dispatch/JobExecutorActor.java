package com.aizuda.easy.retry.server.job.task.support.dispatch;

import akka.actor.AbstractActor;
import cn.hutool.core.lang.Assert;
import com.aizuda.easy.retry.common.core.enums.JobOperationReasonEnum;
import com.aizuda.easy.retry.common.core.enums.JobTaskBatchStatusEnum;
import com.aizuda.easy.retry.common.core.enums.StatusEnum;
import com.aizuda.easy.retry.common.core.log.LogUtils;
import com.aizuda.easy.retry.server.common.akka.ActorGenerator;
import com.aizuda.easy.retry.server.common.exception.EasyRetryServerException;
import com.aizuda.easy.retry.server.job.task.dto.JobTimerTaskDTO;
import com.aizuda.easy.retry.server.job.task.dto.TaskExecuteDTO;
import com.aizuda.easy.retry.server.job.task.support.JobExecutor;
import com.aizuda.easy.retry.server.job.task.support.JobTaskConverter;
import com.aizuda.easy.retry.server.job.task.support.WaitStrategy;
import com.aizuda.easy.retry.server.job.task.support.cache.ResidentTaskCache;
import com.aizuda.easy.retry.server.job.task.support.executor.JobExecutorContext;
import com.aizuda.easy.retry.server.job.task.support.executor.JobExecutorFactory;
import com.aizuda.easy.retry.server.job.task.support.strategy.WaitStrategies;
import com.aizuda.easy.retry.server.job.task.support.timer.JobTimerWheel;
import com.aizuda.easy.retry.server.job.task.support.timer.ResidentJobTimerTask;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.JobMapper;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.JobTaskBatchMapper;
import com.aizuda.easy.retry.template.datasource.persistence.po.Job;
import com.aizuda.easy.retry.template.datasource.persistence.po.JobTaskBatch;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 * @author: www.byteblogs.com
 * @date : 2023-09-25 17:41
 * @since : 2.4.0
 */
@Component(ActorGenerator.JOB_EXECUTOR_ACTOR)
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Slf4j
public class JobExecutorActor extends AbstractActor {
    @Autowired
    private JobMapper jobMapper;
    @Autowired
    private JobTaskBatchMapper jobTaskBatchMapper;
    @Autowired
    private TransactionTemplate transactionTemplate;

    @Override
    public Receive createReceive() {
        return receiveBuilder().match(TaskExecuteDTO.class, taskExecute -> {
            try {
                transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                    @Override
                    protected void doInTransactionWithoutResult(final TransactionStatus status) {
                        doExecute(taskExecute);
                    }
                });

            } catch (Exception e) {
                LogUtils.error(log, "job executor exception. [{}]", taskExecute, e);
            } finally {
                getContext().stop(getSelf());
            }
        }).build();
    }

    private void doExecute(final TaskExecuteDTO taskExecute) {

        Job job = jobMapper.selectOne(new LambdaQueryWrapper<Job>()
            .eq(Job::getJobStatus, StatusEnum.YES.getStatus())
            .eq(Job::getId, taskExecute.getJobId())
        );

        try {
            // 更新批次的状态
            updateBatchStatus(taskExecute, job);

            // 如果任务已经关闭则不需要执行
            if (Objects.isNull(job)) {
                return;
            }

            // 执行任务
            JobExecutor jobExecutor = JobExecutorFactory.getJobExecutor(job.getTaskType());
            JobExecutorContext context = JobTaskConverter.INSTANCE.toJobExecutorContext(job);
            context.setTaskBatchId(taskExecute.getTaskBatchId());
            context.setJobId(job.getId());
            jobExecutor.execute(context);
        } finally {
            doHandlerResidentTask(job, taskExecute);
        }

    }

    private void updateBatchStatus(final TaskExecuteDTO taskExecute, final Job job) {
        int taskStatus = JobTaskBatchStatusEnum.RUNNING.getStatus();
        int operationReason = JobOperationReasonEnum.NONE.getReason();
        if (Objects.isNull(job)) {
            log.warn("任务已经关闭不允许执行. jobId:[{}]", taskExecute.getJobId());
            taskStatus = JobTaskBatchStatusEnum.CANCEL.getStatus();
            operationReason = JobOperationReasonEnum.JOB_CLOSED.getReason();
        }

        JobTaskBatch jobTaskBatch = new JobTaskBatch();
        jobTaskBatch.setId(taskExecute.getTaskBatchId());
        jobTaskBatch.setExecutionAt(LocalDateTime.now());
        jobTaskBatch.setTaskBatchStatus(taskStatus);
        jobTaskBatch.setOperationReason(operationReason);
        Assert.isTrue(1 == jobTaskBatchMapper.updateById(jobTaskBatch),
            () -> new EasyRetryServerException("更新任务失败"));
    }

    private void doHandlerResidentTask(Job job, TaskExecuteDTO taskExecuteDTO) {
        if (Objects.isNull(job)) {
            return;
        }

        // 是否是常驻任务
        if (Objects.equals(StatusEnum.YES.getStatus(), job.getResident())) {

            JobTimerTaskDTO jobTimerTaskDTO = new JobTimerTaskDTO();
            jobTimerTaskDTO.setJobId(taskExecuteDTO.getJobId());
            jobTimerTaskDTO.setTaskBatchId(taskExecuteDTO.getTaskBatchId());
            jobTimerTaskDTO.setGroupName(taskExecuteDTO.getGroupName());
            ResidentJobTimerTask timerTask = new ResidentJobTimerTask(jobTimerTaskDTO, job);
            WaitStrategy waitStrategy = WaitStrategies.WaitStrategyEnum.getWaitStrategy(job.getTriggerType());

            LocalDateTime preTriggerAt = ResidentTaskCache.get(job.getId());
            if (Objects.isNull(preTriggerAt) || preTriggerAt.isBefore(job.getNextTriggerAt())) {
                preTriggerAt = job.getNextTriggerAt();
            }

            WaitStrategies.WaitStrategyContext waitStrategyContext = new WaitStrategies.WaitStrategyContext();
            waitStrategyContext.setTriggerType(job.getTriggerType());
            waitStrategyContext.setTriggerInterval(job.getTriggerInterval());
            waitStrategyContext.setNextTriggerAt(preTriggerAt);
            LocalDateTime nextTriggerAt = waitStrategy.computeRetryTime(waitStrategyContext);

            // 获取时间差的毫秒数
            Duration duration = Duration.between(preTriggerAt, nextTriggerAt);
            long milliseconds = duration.toMillis();

            log.info("常驻任务监控. 任务时间差:[{}] 取余:[{}]", milliseconds, System.currentTimeMillis() % 1000);
            job.setNextTriggerAt(nextTriggerAt);

            JobTimerWheel.register(jobTimerTaskDTO.getTaskBatchId(), timerTask, milliseconds - System.currentTimeMillis() % 1000, TimeUnit.MILLISECONDS);
            ResidentTaskCache.refresh(job.getId(), nextTriggerAt);
        }
    }
}
