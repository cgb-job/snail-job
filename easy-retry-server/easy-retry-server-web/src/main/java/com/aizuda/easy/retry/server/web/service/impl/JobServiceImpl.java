package com.aizuda.easy.retry.server.web.service.impl;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.HashUtil;
import cn.hutool.core.util.StrUtil;
import com.aizuda.easy.retry.common.core.enums.StatusEnum;
import com.aizuda.easy.retry.common.core.util.CronExpression;
import com.aizuda.easy.retry.server.common.config.SystemProperties;
import com.aizuda.easy.retry.server.common.exception.EasyRetryServerException;
import com.aizuda.easy.retry.server.job.task.support.WaitStrategy;
import com.aizuda.easy.retry.server.job.task.support.cache.ResidentTaskCache;
import com.aizuda.easy.retry.server.job.task.support.strategy.WaitStrategies.WaitStrategyContext;
import com.aizuda.easy.retry.server.job.task.support.strategy.WaitStrategies.WaitStrategyEnum;
import com.aizuda.easy.retry.server.web.model.base.PageResult;
import com.aizuda.easy.retry.server.web.model.request.JobQueryVO;
import com.aizuda.easy.retry.server.web.model.request.JobRequestVO;
import com.aizuda.easy.retry.server.web.model.request.JobUpdateJobStatusRequestVO;
import com.aizuda.easy.retry.server.web.model.response.JobResponseVO;
import com.aizuda.easy.retry.server.web.service.JobService;
import com.aizuda.easy.retry.server.web.service.convert.JobConverter;
import com.aizuda.easy.retry.server.web.service.convert.JobResponseVOConverter;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.JobMapper;
import com.aizuda.easy.retry.template.datasource.persistence.po.Job;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author www.byteblogs.com
 * @date 2023-10-11 22:20:42
 * @since 2.4.0
 */
@Service
@Slf4j
public class JobServiceImpl implements JobService {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private SystemProperties systemProperties;
    @Autowired
    private JobMapper jobMapper;

    @Override
    public PageResult<List<JobResponseVO>> getJobPage(JobQueryVO queryVO) {

        PageDTO<Job> pageDTO = new PageDTO<>(queryVO.getPage(), queryVO.getSize());

        LambdaQueryWrapper<Job> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Job::getDeleted, StatusEnum.NO.getStatus());
        if (StrUtil.isNotBlank(queryVO.getGroupName())) {
            queryWrapper.eq(Job::getGroupName, queryVO.getGroupName());
        }

        if (StrUtil.isNotBlank(queryVO.getJobName())) {
            queryWrapper.like(Job::getJobName, queryVO.getJobName().trim() + "%");
        }

        if (Objects.nonNull(queryVO.getJobStatus())) {
            queryWrapper.eq(Job::getJobStatus, queryVO.getJobStatus());
        }

        queryWrapper.eq(Job::getDeleted, StatusEnum.NO.getStatus());
        queryWrapper.orderByDesc(Job::getId);
        PageDTO<Job> selectPage = jobMapper.selectPage(pageDTO, queryWrapper);

        List<JobResponseVO> jobResponseList = JobResponseVOConverter.INSTANCE.toJobResponseVOs(selectPage.getRecords());

        return new PageResult<>(pageDTO, jobResponseList);
    }

    @Override
    public JobResponseVO getJobDetail(Long id) {

        Job job = jobMapper.selectById(id);
        return JobResponseVOConverter.INSTANCE.toJobResponseVO(job);
    }

    @Override
    public List<String> getTimeByCron(String cron) {

        List<String> list = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        for (int i = 0; i < 5; i++) {
            Date nextValidTime;
            try {
                ZonedDateTime zdt = now.atZone(ZoneOffset.ofHours(8));
                nextValidTime = new CronExpression(cron).getNextValidTimeAfter(Date.from(zdt.toInstant()));
                now = LocalDateTime.ofEpochSecond(nextValidTime.getTime() / 1000, 0, ZoneOffset.ofHours(8));
                list.add(dateTimeFormatter.format(now));
            } catch (ParseException ignored) {
            }
        }

        return list;
    }

    @Override
    public List<JobResponseVO> getJobNameList(String keywords, Long jobId) {

        LambdaQueryWrapper<Job> queryWrapper = new LambdaQueryWrapper<Job>()
                .select(Job::getId, Job::getJobName);
        if (StrUtil.isNotBlank(keywords)) {
            queryWrapper.like(Job::getJobName, keywords.trim() + "%");
        }

        if (Objects.nonNull(jobId)) {
            queryWrapper.eq(Job::getId, jobId);
        }

        queryWrapper.eq(Job::getDeleted, StatusEnum.NO.getStatus());
        PageDTO<Job> pageDTO = new PageDTO<>(1, 20);
        PageDTO<Job> selectPage = jobMapper.selectPage(pageDTO, queryWrapper);
        return JobResponseVOConverter.INSTANCE.toJobResponseVOs(selectPage.getRecords());
    }

    @Override
    public boolean saveJob(JobRequestVO jobRequestVO) {
        // 判断常驻任务
        Job job = updateJobResident(jobRequestVO);
        job.setBucketIndex(HashUtil.bkdrHash(jobRequestVO.getGroupName() + jobRequestVO.getJobName()) % systemProperties.getBucketTotal());
        calculateNextTriggerAt(jobRequestVO, LocalDateTime.now());
        return 1 == jobMapper.insert(job);
    }

    @Override
    public boolean updateJob(JobRequestVO jobRequestVO) {
        Assert.notNull(jobRequestVO.getId(), () -> new EasyRetryServerException("id 不能为空"));

        Job job = jobMapper.selectById(jobRequestVO.getId());
        Assert.notNull(job, () -> new EasyRetryServerException("更新失败"));

        LocalDateTime oldTime = job.getNextTriggerAt();
        // 判断常驻任务
        Job updateJob = updateJobResident(jobRequestVO);

//        LocalDateTime waitUpdateTime = null;
        // 新老都是常驻任务
        if (Objects.equals(job.getResident(), StatusEnum.YES.getStatus()) && Objects.equals(updateJob.getResident(), StatusEnum.YES.getStatus())) {
//            LocalDateTime newTime = calculateNextTriggerAt(jobRequestVO, LocalDateTime.now());
            log.info("新老都是常驻任务 newTime:[{}] oldTime:[{}]", null ,  oldTime);
//            job.setNextTriggerAt(oldTime);
            // 老的是常驻任务 新的是非常驻任务 需要使用内存里面的触发时间计算触发时间
        } else  if (Objects.equals(job.getResident(), StatusEnum.YES.getStatus()) && Objects.equals(updateJob.getResident(), StatusEnum.NO.getStatus())) {
            // 常驻任务的触发时间
            LocalDateTime time = Optional.ofNullable(ResidentTaskCache.get(jobRequestVO.getId())).orElse(LocalDateTime.now());
            LocalDateTime newTime = calculateNextTriggerAt(jobRequestVO, time);
            log.info("old是常驻任务 new不常驻任务 newTime:[{}] oldTime:[{}]", newTime ,  oldTime);
            updateJob.setNextTriggerAt(newTime);
            // 老的是不是常驻任务 新的是常驻任务 需要使用当前时间计算下次触发时间
        }  else  if (Objects.equals(job.getResident(), StatusEnum.NO.getStatus()) && Objects.equals(updateJob.getResident(), StatusEnum.YES.getStatus())) {
            LocalDateTime newTime = calculateNextTriggerAt(jobRequestVO, LocalDateTime.now());
            log.info("old不是常驻任务 new是常驻任务 newTime:[{}] oldTime:[{}]",newTime ,  oldTime);
            updateJob.setNextTriggerAt(LocalDateTime.now());
        } else {

            LocalDateTime newTime = calculateNextTriggerAt(jobRequestVO, LocalDateTime.now());
            log.info("old不是常驻任务 new不常驻任务 newTime:[{}] oldTime:[{}]",newTime ,  oldTime);
            updateJob.setNextTriggerAt(newTime);
        }

        return 1 == jobMapper.updateById(updateJob);
    }

    private static LocalDateTime calculateNextTriggerAt(final JobRequestVO jobRequestVO, LocalDateTime time) {
        WaitStrategy waitStrategy = WaitStrategyEnum.getWaitStrategy(jobRequestVO.getTriggerType());
        WaitStrategyContext waitStrategyContext = new WaitStrategyContext();
        waitStrategyContext.setTriggerType(jobRequestVO.getTriggerType());
        waitStrategyContext.setTriggerInterval(jobRequestVO.getTriggerInterval());
        waitStrategyContext.setNextTriggerAt(time);
        return waitStrategy.computeRetryTime(waitStrategyContext);
    }

    @Override
    public Job updateJobResident(JobRequestVO jobRequestVO) {
        Job job = JobConverter.INSTANCE.toJob(jobRequestVO);
        job.setResident(StatusEnum.NO.getStatus());
        if (jobRequestVO.getTriggerType() == WaitStrategyEnum.FIXED.getTriggerType()) {
            if (Integer.parseInt(jobRequestVO.getTriggerInterval()) < 10) {
                job.setResident(StatusEnum.YES.getStatus());
            }
        } else if (jobRequestVO.getTriggerType() == WaitStrategyEnum.CRON.getTriggerType()) {
            List<String> timeByCron = getTimeByCron(jobRequestVO.getTriggerInterval());
            LocalDateTime first = LocalDateTime.parse(timeByCron.get(0), dateTimeFormatter);
            LocalDateTime second = LocalDateTime.parse(timeByCron.get(1), dateTimeFormatter);
            Duration duration = Duration.between(first, second);
            long milliseconds = duration.toMillis();
            if (milliseconds < 10 * 1000) {
                job.setResident(StatusEnum.YES.getStatus());
            }
        } else {
            throw new EasyRetryServerException("未知触发类型");
        }

        return job;
    }

    @Override
    public Boolean updateJobStatus(JobUpdateJobStatusRequestVO jobRequestVO) {
        Assert.notNull(jobRequestVO.getId(), () -> new EasyRetryServerException("id 不能为空"));
        Assert.isTrue(1 == jobMapper.selectCount(new LambdaQueryWrapper<Job>().eq(Job::getId, jobRequestVO.getId())));

        Job job = new Job();
        job.setId(jobRequestVO.getId());
        job.setJobStatus(jobRequestVO.getJobStatus());
        return 1 == jobMapper.updateById(job);
    }

    @Override
    public Boolean deleteJobById(Long id) {
        Job job = new Job();
        job.setId(id);
        job.setDeleted(StatusEnum.YES.getStatus());
        return 1 == jobMapper.updateById(job);
    }
}
