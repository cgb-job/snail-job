(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-666e2d96"],{"0608":function(t,e,o){},"1a11":function(t,e,o){"use strict";o("39b8")},"36e8":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a-card",{attrs:{bordered:!1}},[o("div",{staticClass:"table-page-search-wrapper"},[o("a-form",{attrs:{layout:"inline"}},[o("a-row",{attrs:{gutter:48}})],1)],1),o("div",{staticClass:"table-operator"},[t.selectedRowKeys.length>0?o("a-dropdown",{directives:[{name:"action",rawName:"v-action:edit",arg:"edit"}]},[o("a-button",{staticStyle:{"margin-left":"8px"}},[t._v(" 批量操作 "),o("a-icon",{attrs:{type:"down"}})],1)],1):t._e()],1),o("a-table",{attrs:{columns:t.columns,dataSource:t.data,pagination:t.pagination,loading:t.memberLoading,scroll:{x:1200},rowKey:"id"},on:{expand:t.getRows},scopedSlots:t._u([{key:"log",fn:function(e,n){return o("span",{},[o("a",{on:{click:function(e){return t.getLogRows(n)}}},[t._v("点击查看")])])}},{key:"serial",fn:function(e,n){return o("span",{},[t._v(" "+t._s(n.id)+" ")])}},{key:"taskStatus",fn:function(e){return o("span",{},[o("a-tag",{attrs:{color:t.taskStatus[e].color}},[t._v(" "+t._s(t.taskStatus[e].name)+" ")])],1)}},{key:"clientInfo",fn:function(e){return o("span",{},[t._v(" "+t._s(""!==e?e.split("@")[1]:"")+" ")])}}])}),t.logOpen&&t.record?o("job-batch-log",{attrs:{open:t.logOpen,record:t.record},on:{"update:open":function(e){t.logOpen=e}}}):t._e()],1)},a=[],r=o("e97b"),c=o("fb07"),i=(o("833b"),o("a0e0"),o("3dec"),o("4b43")),s=o("1258"),l=o("2af9"),u=o("3b7a"),d=o("38b7"),f=o.n(d),b=o("1635"),m=o.n(b),g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a-modal",{attrs:{visible:t.visible,width:"100%","wrap-class-name":"full-modal",footer:null,title:"日志详情"},on:{cancel:t.onCancel}},[o("log",{attrs:{value:t.value}})],1)},h=[],p=o("4490"),w=(o("fc3d"),o("b775")),v=o("714d"),j={name:"JobBatchLog",components:{Log:v["a"]},props:{open:{type:Boolean,default:!1},record:{type:Object,default:function(){}},value:{type:Array,default:function(){return[]}}},watch:{value:{deep:!0,immediate:!0,handler:function(t){this.logList=t}},open:{deep:!0,immediate:!0,handler:function(t){this.visible=t}}},data:function(){return{visible:!1,finished:!1,logList:[],interval:null,startId:0,fromIndex:0,controller:new AbortController}},mounted:function(){this.getLogList()},beforeDestroy:function(){this.stopLog()},methods:{onCancel:function(){this.stopLog(),this.$emit("update:open",!1)},stopLog:function(){this.finished=!0,this.controller.abort(),clearTimeout(this.interval),this.interval=void 0},getLogList:function(){var t=this;Object(w["b"])({url:"/job/log/list",method:"get",params:{taskBatchId:this.record.taskBatchId,jobId:this.record.jobId,taskId:this.record.id,startId:this.startId,fromIndex:this.fromIndex,size:50},signal:this.controller.signal}).then((function(e){var o;(t.finished=e.data.finished,t.startId=e.data.nextStartId,t.fromIndex=e.data.fromIndex,e.data.message)&&((o=t.logList).push.apply(o,Object(p["a"])(e.data.message)),t.logList.sort((function(t,e){return t.time_stamp-e.time_stamp})));t.finished||(clearTimeout(t.interval),t.interval=setTimeout(t.getLogList,1e3))})).catch((function(){t.finished=!0}))}}},y=j,k=(o("1a11"),o("f7c6")),L=Object(k["a"])(y,g,h,!1,null,"09c68b19",null),S=L.exports,O={name:"JobTaskList",components:{JobBatchLog:S,AInput:s["a"],ATextarea:i["a"],STable:l["i"]},data:function(){var t=this;return{currentComponet:"List",visible:!1,advanced:!1,logOpen:!1,record:{},queryParam:{startId:0,fromIndex:0},data:[],logData:[],taskStatus:f.a.taskStatus,columns:[{title:"日志",scopedSlots:{customRender:"log"},width:"5%"},{title:"ID",scopedSlots:{customRender:"serial"},width:"8%"},{title:"组名称",dataIndex:"groupName"},{title:"地址",dataIndex:"clientInfo",scopedSlots:{customRender:"clientInfo"}},{title:"参数",dataIndex:"argsStr",ellipsis:!0},{title:"结果",dataIndex:"resultMessage",ellipsis:!0},{title:"状态",dataIndex:"taskStatus",scopedSlots:{customRender:"taskStatus"}},{title:"重试次数",dataIndex:"retryCount"},{title:"开始执行时间",dataIndex:"createDt",sorter:!0,width:"10%"}],logColumns:[{title:"#",scopedSlots:{customRender:"serial"},width:"5%"},{title:"信息",dataIndex:"message",width:"50%"},{title:"执行时间",dataIndex:"createDt",sorter:!0,customRender:function(t){return m()(t).format("YYYY-MM-DD HH:mm:ss")},width:"10%"}],selectedRowKeys:[],selectedRows:[],options:{alert:{show:!0,clear:function(){t.selectedRowKeys=[]}},rowSelection:{selectedRowKeys:this.selectedRowKeys,onChange:this.onSelectChange}},optionAlertShow:!1,groupNameList:[],sceneList:[],memberLoading:!1,pagination:{},logPagination:{}}},created:function(){},methods:{loadData:function(t){var e=this.logData.filter((function(e){return e.taskId===t.id}));return e},handleChange:function(t){},toggleAdvanced:function(){this.advanced=!this.advanced},getRows:function(t,e){var o=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t){n.next=4;break}return n.next=3,o.fetchLog({taskBatchId:e.taskBatchId,jobId:e.jobId,taskId:e.id,startId:0,fromIndex:0},e);case 3:o.$forceUpdate();case 4:case"end":return n.stop()}}),n)})))()},handleOk:function(t){},queryChange:function(){this.fetch()},fetch:function(){var t=this;this.loading=!0,Object(u["l"])(this.queryParam).then((function(e){t.data=e.data;var o=Object(r["a"])({},t.pagination);o.pageSize=e.size,o.current=e.page,o.total=e.total,t.pagination=o,t.loading=!1}))},refreshTable:function(t){this.queryParam=t,this.queryChange()},fetchLog:function(t,e){return Object(c["a"])(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,Object(u["i"])(t);case 2:n=o.sent,e.logData=n.data;case 4:case"end":return o.stop()}}),o)})))()},onSelectChange:function(t,e){this.selectedRowKeys=t,this.selectedRows=e},getLogRows:function(t){this.record=t,this.logOpen=!0}}},x=O,I=Object(k["a"])(x,n,a,!1,null,null,null);e["default"]=I.exports},"38b7":function(t,e){var o={jobStatusEnum:{0:{name:"关闭",color:"#9c1f1f"},1:{name:"开启",color:"#f5a22d"}},taskType:{1:{name:"集群模式",color:"#d06892"},2:{name:"广播模式",color:"#f5a22d"},3:{name:"分片模式",color:"#e1f52d"}},triggerType:{2:{name:"固定时间",color:"#f5a22d"},3:{name:"CRON表达式",color:"#d06892"},99:{name:"工作流",color:"#76f52d"}},blockStrategy:{1:{name:"丢弃策略",color:"#d06892"},2:{name:"覆盖",color:"#f5a22d"},3:{name:"并行",color:"#e1f52d"}},executorType:{1:{name:"Java",color:"#d06892"}},routeKey:{4:{name:"轮询",color:"#8f68d2"},1:{name:"一致性Hash",color:"#d06892"},2:{name:"随机",color:"#f5a22d"},3:{name:"LRU",color:"#e1f52d"}},taskBatchStatus:{1:{name:"待处理",color:"#64a6ea"},2:{name:"运行中",color:"#1b7ee5"},3:{name:"成功",color:"#087da1"},4:{name:"失败",color:"#f52d80"},5:{name:"停止",color:"#ac2df5"},6:{name:"取消",color:"#f5732d"}},operationReason:{0:{name:""},1:{name:"执行超时",color:"#64a6ea"},2:{name:"无客户端节点",color:"#1b7ee5"},3:{name:"任务已关闭",color:"#087da1"},4:{name:"任务丢弃",color:"#3a2f81"},5:{name:"任务被覆盖",color:"#c2238a"},6:{name:"无可执行任务项",color:"#23c28a"},7:{name:"任务执行期间发生非预期异常",color:"#bdc223"},8:{name:"手动停止",color:"#23c28a"}},taskStatus:{2:{name:"运行中",color:"#1b7ee5"},3:{name:"成功",color:"#087da1"},4:{name:"失败",color:"#f52d80"},5:{name:"停止",color:"#ac2df5"}},notifyScene:{1:{name:"任务执行失败",color:"#d06892"}},notifyType:{1:{name:"钉钉通知",color:"#64a6ea"},2:{name:"邮箱通知",color:"#1b7ee5"},3:{name:"企业微信",color:"#0082EF"},4:{name:"飞书",color:"#087da1"}},notifyStatus:{0:{name:"停用",color:"#9c1f1f"},1:{name:"启用",color:"#f5a22d"}},rateLimiterStatus:{0:{name:"未启用",color:"#9c1f1f"},1:{name:"启用",color:"#f5a22d"}},workflowStatus:{0:{name:"关闭",color:"#9c1f1f"},1:{name:"开启",color:"#f5a22d"}}};t.exports=o},"39b8":function(t,e,o){},"3b7a":function(t,e,o){"use strict";o.d(e,"m",(function(){return r})),o.d(e,"A",(function(){return c})),o.d(e,"q",(function(){return i})),o.d(e,"t",(function(){return s})),o.d(e,"b",(function(){return l})),o.d(e,"x",(function(){return u})),o.d(e,"y",(function(){return d})),o.d(e,"z",(function(){return f})),o.d(e,"s",(function(){return b})),o.d(e,"p",(function(){return m})),o.d(e,"j",(function(){return g})),o.d(e,"r",(function(){return h})),o.d(e,"a",(function(){return p})),o.d(e,"w",(function(){return w})),o.d(e,"i",(function(){return v})),o.d(e,"l",(function(){return j})),o.d(e,"h",(function(){return y})),o.d(e,"g",(function(){return k})),o.d(e,"f",(function(){return L})),o.d(e,"d",(function(){return S})),o.d(e,"c",(function(){return O})),o.d(e,"n",(function(){return x})),o.d(e,"u",(function(){return I})),o.d(e,"k",(function(){return _})),o.d(e,"e",(function(){return C})),o.d(e,"o",(function(){return R})),o.d(e,"v",(function(){return D}));o("f1e1");var n=o("b775"),a={jobPageList:"/job/page/list",jobList:"/job/list",jobDetail:"/job",saveJob:"/job",updateJob:"/job",updateJobStatus:"/job/status",delJob:"/job",timeByCron:"/job/cron",jobNameList:"/job/job-name/list",triggerJob:"/job/trigger",jobBatchList:"/job/batch/list",jobBatchDetail:"/job/batch",stop:"/job/batch/stop",retry:"/job/batch/retry",jobNotifyConfigPageList:"/job/notify/config/page/list",jobNotifyConfigDetail:"/job/notify/config",saveJobNotify:"/job/notify/config",updateJobNotify:"/job/notify/config",jobTaskList:"/job/task/list",jobLogList:"/job/log/list",workflowListPage:"/workflow/page/list",saveWorkflow:"/workflow",updateWorkflow:"/workflow",workflowDetail:"/workflow",workflowBatchListPage:"/workflow/batch/page/list",workflowBatchDetail:"/workflow/batch",updateStatus:"/workflow/update/status",delWorkflow:"/workflow",triggerWorkflow:"/workflow/trigger",stopWorkflowBatch:"/workflow/batch/stop",workflowNameList:"/workflow/workflow-name/list"};function r(t){return Object(n["b"])({url:"".concat(a.retry,"/").concat(t),method:"post"})}function c(t){return Object(n["b"])({url:a.workflowNameList,method:"get",params:t})}function i(t){return Object(n["b"])({url:"".concat(a.stopWorkflowBatch,"/").concat(t),method:"post"})}function s(t){return Object(n["b"])({url:"".concat(a.triggerWorkflow,"/").concat(t),method:"post"})}function l(t){return Object(n["b"])({url:"".concat(a.delWorkflow,"/").concat(t),method:"delete"})}function u(t){return Object(n["b"])({url:"".concat(a.updateStatus,"/").concat(t),method:"put"})}function d(t){return Object(n["b"])({url:a.workflowBatchListPage,method:"get",params:t})}function f(t){return Object(n["b"])({url:a.workflowListPage,method:"get",params:t})}function b(t){return Object(n["b"])({url:"".concat(a.triggerJob,"/").concat(t),method:"post"})}function m(t){return Object(n["b"])({url:a.stop+t,method:"post"})}function g(t){return Object(n["b"])({url:a.jobNameList,method:"get",params:t})}function h(t){return Object(n["b"])({url:a.timeByCron,method:"get",params:t})}function p(t){return Object(n["b"])({url:"".concat(a.delJob,"/").concat(t),method:"delete"})}function w(t){return Object(n["b"])({url:a.updateJobStatus,method:"put",data:t})}function v(t){return Object(n["b"])({url:a.jobLogList,method:"get",params:t})}function j(t){return Object(n["b"])({url:a.jobTaskList,method:"get",params:t})}function y(t){return Object(n["b"])({url:a.jobBatchList,method:"get",params:t})}function k(t){return Object(n["b"])({url:"".concat(a.jobBatchDetail,"/").concat(t),method:"get"})}function L(t){return Object(n["b"])({url:a.jobPageList,method:"get",params:t})}function S(t){return Object(n["b"])({url:a.jobList,method:"get",params:t})}function O(t){return Object(n["b"])({url:"".concat(a.jobDetail,"/").concat(t),method:"get"})}function x(t){return Object(n["b"])({url:a.saveJob,method:"post",data:t})}function I(t){return Object(n["b"])({url:a.updateJob,method:"put",data:t})}function _(t){return Object(n["b"])({url:a.jobNotifyConfigPageList,method:"get",params:t})}function C(t){return Object(n["b"])({url:"".concat(a.jobNotifyConfigDetail,"/").concat(t),method:"get"})}function R(t){return Object(n["b"])({url:a.saveJobNotify,method:"post",data:t})}function D(t){return Object(n["b"])({url:a.updateJobNotify,method:"put",data:t})}},4490:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var n=o("176f");function a(t){if(Array.isArray(t))return Object(n["a"])(t)}o("80ab"),o("a98c"),o("3dec"),o("e73f"),o("0c40"),o("79da"),o("b14d");function r(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var c=o("2d4d");function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return a(t)||r(t)||Object(c["a"])(t)||i()}},"714d":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"log"},[o("table",{staticClass:"scroller"},[o("tbody",t._l(t.logList,(function(e,n){return o("tr",{key:n},[o("td",{staticClass:"index"},[t._v(" "+t._s(n+1)+" ")]),o("td",[o("div",{staticClass:"content"},[o("div",{staticClass:"line"},[o("div",{staticClass:"flex"},[o("div",{staticClass:"text",staticStyle:{color:"#2db7f5"}},[t._v(t._s(t.timestampToDate(e.time_stamp)))]),o("div",{staticClass:"text",style:{color:t.LevelEnum[e.level].color}},[t._v(" "+t._s(4===e.level.length?e.level+" ":e.level)+" ")]),e.host?o("div",{staticClass:"text",staticStyle:{color:"#00a3a3"}},[t._v(" [ "+t._s(e.host)+" "),e.port?[t._v(":"+t._s(e.port))]:t._e(),t._v(" ] ")],2):t._e(),o("div",{staticClass:"text",staticStyle:{color:"#00a3a3"}},[t._v("["+t._s(e.thread)+"]")]),o("div",{staticClass:"text",staticStyle:{color:"#a771bf","font-weight":"500"}},[t._v(t._s(e.location))]),o("div",{staticClass:"text"},[t._v(":")])]),o("div",{staticClass:"text",staticStyle:{"font-size":"16px"}},[t._v(t._s(e.message))]),o("div",{staticClass:"text",staticStyle:{"font-size":"16px"}},[t._v(t._s(e.throwable))])])])])])})),0)])])},a=[],r=(o("0936"),o("d6a4"),o("3dec"),o("4656"),o("f1e1"),{name:"Log",components:{},props:{value:{type:Array,default:function(){return[]}}},watch:{value:{deep:!0,immediate:!0,handler:function(t){this.logList=t}}},data:function(){var t=this.$createElement;return{logList:[],indicator:t("a-icon",{attrs:{type:"loading",spin:!0},style:"font-size: 24px; color: '#d9d9d9'"}),LevelEnum:{DEBUG:{name:"DEBUG",color:"#2647cc"},INFO:{name:"INFO",color:"#5c962c"},WARN:{name:"WARN",color:"#da9816"},ERROR:{name:"ERROR",color:"#dc3f41"}}}},methods:{timestampToDate:function(t){var e=new Date(Number.parseInt(t.toString())),o=e.getFullYear(),n=1===(e.getMonth()+1).toString().length?"0"+(e.getMonth()+1):(e.getMonth()+1).toString(),a=e.getDate(),r=e.getHours(),c=1===e.getMinutes().toString().length?"0"+e.getMinutes():e.getMinutes().toString(),i=1===e.getSeconds().toString().length?"0"+e.getSeconds():e.getSeconds().toString();return"".concat(o,"-").concat(n,"-").concat(a," ").concat(r,":").concat(c,":").concat(i,".").concat(e.getMilliseconds())}}}),c=r,i=(o("7e31"),o("f7c6")),s=Object(i["a"])(c,n,a,!1,null,"048c7c04",null);e["a"]=s.exports},"7e31":function(t,e,o){"use strict";o("0608")},fb07:function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));o("3dec");function n(t,e,o,n,a,r,c){try{var i=t[r](c),s=i.value}catch(l){return void o(l)}i.done?e(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var e=this,o=arguments;return new Promise((function(a,r){var c=t.apply(e,o);function i(t){n(c,a,r,i,s,"next",t)}function s(t){n(c,a,r,i,s,"throw",t)}i(void 0)}))}}}}]);