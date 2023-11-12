package com.aizuda.easy.retry.server.retry.task.support.timer;

import com.aizuda.easy.retry.common.core.context.SpringContext;
import com.aizuda.easy.retry.common.core.enums.RetryStatusEnum;
import com.aizuda.easy.retry.common.core.util.JsonUtil;
import com.aizuda.easy.retry.server.retry.task.support.dispatch.task.TaskExecutor;
import com.aizuda.easy.retry.server.retry.task.support.dispatch.task.TaskActuatorFactory;
import com.aizuda.easy.retry.template.datasource.access.AccessTemplate;
import com.aizuda.easy.retry.template.datasource.access.TaskAccess;
import com.aizuda.easy.retry.template.datasource.persistence.po.RetryTask;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import io.netty.util.Timeout;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.Objects;

/**
 * @author: www.byteblogs.com
 * @date : 2023-09-22 17:09
 */
@Data
@Slf4j
public class RetryTimerTask extends AbstractTimerTask {

    private RetryTimerContext context;

    public RetryTimerTask(RetryTimerContext context) {
        this.context = context;
        super.groupName = context.getGroupName();
        super.uniqueId = context.getUniqueId();
    }

    @Override
    public void doRun(final Timeout timeout){
        AccessTemplate accessTemplate = SpringContext.getBeanByType(AccessTemplate.class);
        TaskAccess<RetryTask> retryTaskAccess = accessTemplate.getRetryTaskAccess();
        RetryTask retryTask = retryTaskAccess.one(context.getGroupName(), new LambdaQueryWrapper<RetryTask>()
                .eq(RetryTask::getGroupName, context.getGroupName())
                .eq(RetryTask::getUniqueId, context.getUniqueId())
                .eq(RetryTask::getRetryStatus, RetryStatusEnum.RUNNING.getStatus()));
        if (Objects.isNull(retryTask)) {
            return;
        }
        TaskExecutor taskExecutor = TaskActuatorFactory.getTaskActuator(context.getScene());
        taskExecutor.actuator(retryTask);
    }
}
