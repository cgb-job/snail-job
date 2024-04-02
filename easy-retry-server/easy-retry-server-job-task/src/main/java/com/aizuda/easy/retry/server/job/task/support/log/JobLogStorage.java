package com.aizuda.easy.retry.server.job.task.support.log;

import akka.actor.ActorRef;
import com.aizuda.easy.retry.common.core.util.JsonUtil;
import com.aizuda.easy.retry.common.log.dto.LogContentDTO;
import com.aizuda.easy.retry.common.log.dto.TaskLogFieldDTO;
import com.aizuda.easy.retry.common.log.enums.LogTypeEnum;
import com.aizuda.easy.retry.server.common.LogStorage;
import com.aizuda.easy.retry.server.common.akka.ActorGenerator;
import com.aizuda.easy.retry.server.common.dto.LogMetaDTO;
import com.aizuda.easy.retry.server.common.log.LogStorageFactory;
import com.aizuda.easy.retry.server.job.task.dto.JobLogDTO;
import com.aizuda.easy.retry.server.common.dto.JobLogMetaDTO;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author: xiaowoniu
 * @date : 2024-03-22
 * @since : 3.2.0
 */
@Component
public class JobLogStorage implements LogStorage, InitializingBean {

    @Override
    public LogTypeEnum logType() {
        return LogTypeEnum.JOB;
    }

    @Override
    public void storage(final LogContentDTO logContentDTO, final LogMetaDTO logMetaDTO) {

        JobLogMetaDTO jobLogMetaDTO = (JobLogMetaDTO) logMetaDTO;
        JobLogDTO jobLogDTO = new JobLogDTO();
        Map<String, String> messageMap = logContentDTO.getFieldList()
            .stream()
            .filter(logTaskDTO_ -> !Objects.isNull(logTaskDTO_.getValue()))
            .collect(Collectors.toMap(TaskLogFieldDTO::getName, TaskLogFieldDTO::getValue));
        jobLogDTO.setMessage(JsonUtil.toJsonString(Lists.newArrayList(messageMap)));
        jobLogDTO.setTaskId(jobLogMetaDTO.getTaskId());
        jobLogDTO.setJobId(jobLogMetaDTO.getJobId());
        jobLogDTO.setGroupName(logMetaDTO.getGroupName());
        jobLogDTO.setNamespaceId(logMetaDTO.getNamespaceId());
        jobLogDTO.setTaskBatchId(jobLogMetaDTO.getTaskBatchId());
        jobLogDTO.setRealTime(logContentDTO.getTimeStamp());
        ActorRef actorRef = ActorGenerator.jobLogActor();
        actorRef.tell(jobLogDTO, actorRef);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        LogStorageFactory.register(logType(), this);
    }
}
