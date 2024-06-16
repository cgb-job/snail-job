package com.aizuda.snailjob.server.web.model.request;

import com.aizuda.snailjob.server.web.model.base.BaseQueryVO;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author: opensnail
 * @date : 2022-02-28 09:45
 */
@Data
public class RetryDeadLetterQueryVO extends BaseQueryVO {
    private String groupName;
    private String sceneName;
    private String bizNo;
    private String idempotentId;
    private String uniqueId;
    private LocalDateTime beginDate;
    private LocalDateTime endDate;
}
