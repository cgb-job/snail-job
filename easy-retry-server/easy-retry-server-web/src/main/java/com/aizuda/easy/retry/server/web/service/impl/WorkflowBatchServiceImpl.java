package com.aizuda.easy.retry.server.web.service.impl;

import cn.hutool.core.util.StrUtil;
import com.aizuda.easy.retry.common.core.constant.SystemConstants;
import com.aizuda.easy.retry.common.core.enums.JobOperationReasonEnum;
import com.aizuda.easy.retry.common.core.enums.StatusEnum;
import com.aizuda.easy.retry.server.common.dto.JobTaskConfig;
import com.aizuda.easy.retry.server.common.exception.EasyRetryServerException;
import com.aizuda.easy.retry.server.job.task.support.cache.MutableGraphCache;
import com.aizuda.easy.retry.server.web.model.base.PageResult;
import com.aizuda.easy.retry.server.web.model.request.UserSessionVO;
import com.aizuda.easy.retry.server.web.model.request.WorkflowBatchQueryVO;
import com.aizuda.easy.retry.server.web.model.response.JobBatchResponseVO;
import com.aizuda.easy.retry.server.web.model.response.WorkflowBatchResponseVO;
import com.aizuda.easy.retry.server.web.model.response.WorkflowDetailResponseVO;
import com.aizuda.easy.retry.server.web.service.WorkflowBatchService;
import com.aizuda.easy.retry.server.web.service.convert.JobBatchResponseVOConverter;
import com.aizuda.easy.retry.server.web.service.convert.WorkflowConverter;
import com.aizuda.easy.retry.server.web.service.handler.WorkflowHandler;
import com.aizuda.easy.retry.server.web.util.UserSessionUtils;
import com.aizuda.easy.retry.template.datasource.persistence.dataobject.WorkflowBatchQueryDO;
import com.aizuda.easy.retry.template.datasource.persistence.dataobject.WorkflowBatchResponseDO;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.JobTaskBatchMapper;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.WorkflowMapper;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.WorkflowNodeMapper;
import com.aizuda.easy.retry.template.datasource.persistence.mapper.WorkflowTaskBatchMapper;
import com.aizuda.easy.retry.template.datasource.persistence.po.JobTaskBatch;
import com.aizuda.easy.retry.template.datasource.persistence.po.Workflow;
import com.aizuda.easy.retry.template.datasource.persistence.po.WorkflowNode;
import com.aizuda.easy.retry.template.datasource.persistence.po.WorkflowTaskBatch;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.graph.MutableGraph;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author xiaowoniu
 * @date 2023-12-23 17:48:31
 * @since 2.6.0
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class WorkflowBatchServiceImpl implements WorkflowBatchService {
    private static final Integer NOT_HANDLE_STATUS = 99;
    private final WorkflowTaskBatchMapper workflowTaskBatchMapper;
    private final WorkflowMapper workflowMapper;
    private final WorkflowNodeMapper workflowNodeMapper;
    private final JobTaskBatchMapper jobTaskBatchMapper;
    private final WorkflowHandler workflowHandler;

    @Override
    public PageResult<List<WorkflowBatchResponseVO>> listPage(WorkflowBatchQueryVO queryVO) {
        PageDTO<JobTaskBatch> pageDTO = new PageDTO<>(queryVO.getPage(), queryVO.getSize());

        UserSessionVO userSessionVO = UserSessionUtils.currentUserSession();
        List<String> groupNames = Lists.newArrayList();
        if (userSessionVO.isUser()) {
            groupNames = userSessionVO.getGroupNames();
        }

        if (StrUtil.isNotBlank(queryVO.getGroupName())) {
            // 说明当前组不在用户配置的权限中
            if (!CollectionUtils.isEmpty(groupNames) && !groupNames.contains(queryVO.getGroupName())) {
                return new PageResult<>(pageDTO, Lists.newArrayList());
            } else {
                groupNames = Lists.newArrayList(queryVO.getGroupName());
            }
        }

        WorkflowBatchQueryDO workflowBatchQueryDO = new WorkflowBatchQueryDO();
        if (StrUtil.isNotBlank(queryVO.getWorkflowName())) {
            workflowBatchQueryDO.setWorkflowName(queryVO.getWorkflowName() + "%");
        }

        workflowBatchQueryDO.setWorkflowId(queryVO.getWorkflowId());
        workflowBatchQueryDO.setTaskBatchStatus(queryVO.getTaskBatchStatus());
        workflowBatchQueryDO.setGroupNames(groupNames);
        workflowBatchQueryDO.setNamespaceId(userSessionVO.getNamespaceId());
        List<WorkflowBatchResponseDO> batchResponseDOList = workflowTaskBatchMapper.selectWorkflowBatchPageList(pageDTO, workflowBatchQueryDO);

        List<WorkflowBatchResponseVO> batchResponseVOList =
                WorkflowConverter.INSTANCE.toWorkflowBatchResponseVO(batchResponseDOList);

        return new PageResult<>(pageDTO, batchResponseVOList);
    }

    @Override
    public WorkflowDetailResponseVO getWorkflowBatchDetail(Long id) {

        WorkflowTaskBatch workflowTaskBatch = workflowTaskBatchMapper.selectById(id);
        if (Objects.isNull(workflowTaskBatch)) {
            return null;
        }

        Workflow workflow = workflowMapper.selectById(workflowTaskBatch.getWorkflowId());

        WorkflowDetailResponseVO responseVO = WorkflowConverter.INSTANCE.toWorkflowDetailResponseVO(workflow);
        List<WorkflowNode> workflowNodes = workflowNodeMapper.selectList(new LambdaQueryWrapper<WorkflowNode>()
                .eq(WorkflowNode::getDeleted, StatusEnum.NO.getStatus())
                .eq(WorkflowNode::getWorkflowId, workflow.getId()));

        List<JobTaskBatch> alJobTaskBatchList = jobTaskBatchMapper.selectList(new LambdaQueryWrapper<JobTaskBatch>()
                .eq(JobTaskBatch::getWorkflowTaskBatchId, id).orderByDesc(JobTaskBatch::getId));

        Map<Long, List<JobTaskBatch>> jobTaskBatchMap = alJobTaskBatchList.stream()
                .collect(Collectors.groupingBy(JobTaskBatch::getWorkflowNodeId));
        List<WorkflowDetailResponseVO.NodeInfo> nodeInfos = WorkflowConverter.INSTANCE.toNodeInfo(workflowNodes);

        String flowInfo = workflowTaskBatch.getFlowInfo();
        MutableGraph<Long> graph = MutableGraphCache.getOrDefault(id, flowInfo);

        Set<Long> allNoOperationNode = Sets.newHashSet();
        Map<Long, WorkflowDetailResponseVO.NodeInfo> workflowNodeMap = nodeInfos.stream()
                .peek(nodeInfo -> {
                    List<JobTaskBatch> jobTaskBatchList = jobTaskBatchMap.get(nodeInfo.getId());
                    if (!CollectionUtils.isEmpty(jobTaskBatchList)) {
                        nodeInfo.setJobBatchList(JobBatchResponseVOConverter.INSTANCE.jobTaskBatchToJobBatchResponseVOs(jobTaskBatchList));
                        // 取第最新的一条状态
                        nodeInfo.setTaskBatchStatus(jobTaskBatchList.get(0).getTaskBatchStatus());

                        if (jobTaskBatchList.stream()
                                .map(JobTaskBatch::getOperationReason)
                                .filter(Objects::nonNull)
                                .anyMatch(i -> i == JobOperationReasonEnum.WORKFLOW_NODE_NO_OPERATION_REQUIRED.getReason())) {
                            // 当前节点下面的所有节点都是无需处理的节点
                            Set<Long> allDescendants = MutableGraphCache.getAllDescendants(graph, nodeInfo.getId());
                            allNoOperationNode.addAll(allDescendants);
                        } else {
                            // 删除被误添加的节点
                            allNoOperationNode.remove(nodeInfo.getId());
                        }
                    }
                })
                .collect(Collectors.toMap(WorkflowDetailResponseVO.NodeInfo::getId, i -> i));

        for (Long noOperationNodeId : allNoOperationNode) {
            WorkflowDetailResponseVO.NodeInfo nodeInfo = workflowNodeMap.get(noOperationNodeId);
            JobBatchResponseVO jobBatchResponseVO = new JobBatchResponseVO();
            JobTaskConfig jobTask = nodeInfo.getJobTask();
            if (Objects.nonNull(jobTask)) {
                jobBatchResponseVO.setJobId(jobTask.getJobId());
            }
            // 只为前端展示提供
            nodeInfo.setTaskBatchStatus(NOT_HANDLE_STATUS);
            jobBatchResponseVO.setTaskBatchStatus(NOT_HANDLE_STATUS);
            jobBatchResponseVO.setOperationReason(JobOperationReasonEnum.WORKFLOW_NODE_NO_OPERATION_REQUIRED.getReason());
            nodeInfo.setJobBatchList(Lists.newArrayList(jobBatchResponseVO));
        }
        try {
            // 反序列化构建图
            WorkflowDetailResponseVO.NodeConfig config = workflowHandler.buildNodeConfig(graph, SystemConstants.ROOT, new HashMap<>(), workflowNodeMap);
            responseVO.setNodeConfig(config);
        } catch (Exception e) {
            log.error("反序列化失败. json:[{}]", flowInfo, e);
            throw new EasyRetryServerException("查询工作流批次详情失败");
        }

        return responseVO;
    }

}
