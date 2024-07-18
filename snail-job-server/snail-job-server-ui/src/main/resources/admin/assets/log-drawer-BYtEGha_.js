import{d as K,r as b,al as G,bF as re,dl as ce,o as r,b as j,e as m,aM as oe,Z as ue,a0 as de,bs as _e,q as me,bT as pe,c as _,w as s,f as t,g as I,h as v,au as E,t as U,cs as ee,B as te,X as O,x as fe,bE as H,ai as C,F as he,ap as ve,aj as ge,a8 as be,_ as ye,de as ke,df as xe,cP as we,cQ as Se,a3 as P,l as $e}from"./index-D2gfy4BV.js";import{a as Ie,_ as le}from"./CollapseItem-BF9JL9RU.js";const ze={scrollbarProps:Object,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},Te=K({name:"VirtualList",props:ze,setup(u){const l=b(null),g=b(null);function p(){const{value:i}=l;i&&i.sync()}function z(i){var o;p(),(o=u.onScroll)===null||o===void 0||o.call(u,i)}function B(i){var o;p(),(o=u.onResize)===null||o===void 0||o.call(u,i)}function L(i){var o;(o=u.onWheel)===null||o===void 0||o.call(u,i)}function y(i,o){var w,S;typeof i=="number"?(w=g.value)===null||w===void 0||w.scrollTo(i,o??0):(S=g.value)===null||S===void 0||S.scrollTo(i)}function f(){var i;return(i=g.value)===null||i===void 0?void 0:i.listElRef}function T(){var i;return(i=g.value)===null||i===void 0?void 0:i.itemsElRef}return{scrollTo:y,scrollbarInstRef:l,virtualListInstRef:g,getScrollContainer:f,getScrollContent:T,handleScroll:z,handleResize:B,handleWheel:L}},render(){return G(ce,Object.assign({},this.scrollbarProps,{ref:"scrollbarInstRef",container:this.getScrollContainer,content:this.getScrollContent}),{default:()=>G(re,{ref:"virtualListInstRef",showScrollbar:!1,items:this.items,itemSize:this.itemSize,itemResizable:this.itemResizable,itemsStyle:this.itemsStyle,visibleItemsTag:this.visibleItemsTag,visibleItemsProps:this.visibleItemsProps,ignoreItemResize:this.ignoreItemResize,keyField:this.keyField,defaultScrollKey:this.defaultScrollKey,defaultScrollIndex:this.defaultScrollIndex,paddingTop:this.paddingTop,paddingBottom:this.paddingBottom,onScroll:this.handleScroll,onResize:this.handleResize,onWheel:this.handleWheel},{default:({item:u,index:l})=>{var g,p;return(p=(g=this.$slots).default)===null||p===void 0?void 0:p.call(g,{item:u,index:l})}})})}}),Ce={class:"inline-block",viewBox:"0 0 14 14",width:"1em",height:"1em"},je=m("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round"},[m("path",{d:"M10.13 3.48L7.26.61a.36.36 0 0 0-.52 0L3.87 3.48m6.26 7.04l-2.87 2.87a.36.36 0 0 1-.52 0l-2.87-2.87"}),m("circle",{cx:"7",cy:"7",r:"1.25"})],-1),Be=[je];function De(u,l){return r(),j("svg",Ce,[...Be])}const Ne={name:"streamline-interface-arrows-vertical-scroll-point-move-scroll-vertical",render:De},Le={class:"inline-block",viewBox:"0 0 14 14",width:"1em",height:"1em"},Me=m("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round"},[m("path",{d:"m5 11l.5 2l-2 .5"}),m("path",{d:"M5.5 13A6.76 6.76 0 0 1 1 7a6 6 0 0 1 .66-2.736M4.95 1.36a6 6 0 0 0-2.19 1.394M9 3l-.5-2l2-.5"}),m("path",{d:"M8.5 1c2.3.84 4.5 3.42 4.5 6a6 6 0 0 1-1.731 4.2M9 12.64c.22-.078.434-.168.642-.27M.5.5l13 13"})],-1),Re=[Me];function Fe(u,l){return r(),j("svg",Le,[...Re])}const Ve={name:"streamline-synchronize-disable",render:Fe},qe={class:"inline-block",viewBox:"0 0 24 24",width:"1em",height:"1em"},Ae=m("path",{fill:"currentColor","fill-rule":"evenodd",d:"M2.93 11.2c.072-4.96 4.146-8.95 9.149-8.95a9.158 9.158 0 0 1 7.814 4.357a.75.75 0 0 1-1.277.786a7.658 7.658 0 0 0-6.537-3.643c-4.185 0-7.575 3.328-7.648 7.448l.4-.397a.75.75 0 0 1 1.057 1.065l-1.68 1.666a.75.75 0 0 1-1.056 0l-1.68-1.666A.75.75 0 1 1 2.528 10.8zm16.856-.733a.75.75 0 0 1 1.055 0l1.686 1.666a.75.75 0 1 1-1.054 1.067l-.41-.405c-.07 4.965-4.161 8.955-9.18 8.955a9.197 9.197 0 0 1-7.842-4.356a.75.75 0 1 1 1.277-.788a7.697 7.697 0 0 0 6.565 3.644c4.206 0 7.61-3.333 7.68-7.453l-.408.403a.75.75 0 1 1-1.055-1.067z","clip-rule":"evenodd"},null,-1),Ee=[Ae];function Oe(u,l){return r(),j("svg",qe,[...Ee])}const Pe={name:"solar-refresh-outline",render:Oe},We={class:"inline-block",viewBox:"0 0 16 16",width:"1em",height:"1em"},Ue=m("path",{fill:"currentColor","fill-rule":"evenodd",d:"M7.706.29c-.222.072-.35.2-.412.409c-.035.117-.041.389-.041 1.809c0 1.881-.002 1.857.19 2.049c.257.256.857.256 1.114 0c.192-.192.19-.168.19-2.049c0-1.82-.003-1.852-.151-2.028C8.472.333 8.339.284 8.04.276a1.705 1.705 0 0 0-.334.014M2.753 2.266c-.158.072-.391.3-.472.462a.605.605 0 0 0-.012.525c.074.165 2.398 2.497 2.581 2.59c.259.133.525.068.793-.194c.264-.258.334-.538.2-.799c-.093-.183-2.425-2.507-2.59-2.581a.638.638 0 0 0-.5-.003m10.1.016c-.123.057-.333.254-1.335 1.259c-.921.923-1.202 1.221-1.247 1.319a.617.617 0 0 0 .001.518c.07.15.3.386.455.467c.157.082.39.081.553-.002c.167-.086 2.477-2.396 2.563-2.563a.648.648 0 0 0 .003-.551a1.26 1.26 0 0 0-.454-.446a.569.569 0 0 0-.539-.001M.699 7.292c-.295.093-.441.328-.441.707c.001.387.145.619.44.707c.118.035.381.041 1.81.041c1.489 0 1.688-.005 1.81-.045a.602.602 0 0 0 .384-.384c.086-.265.043-.641-.094-.827a.723.723 0 0 0-.191-.148l-.137-.076l-1.733-.006c-1.395-.004-1.756.002-1.848.031m11.046-.014a.757.757 0 0 0-.353.214c-.137.185-.18.561-.094.826c.058.18.204.326.384.384c.122.04.321.045 1.81.045c1.429 0 1.692-.006 1.81-.041c.295-.088.439-.32.44-.707c0-.385-.147-.616-.452-.708c-.103-.031-.426-.037-1.794-.035c-.918.002-1.706.012-1.751.022m-6.892 3.004c-.123.057-.333.254-1.335 1.259c-.921.923-1.202 1.221-1.247 1.319a.617.617 0 0 0 .001.518c.07.15.3.386.455.467c.157.082.39.081.553-.002c.167-.086 2.477-2.396 2.563-2.563a.648.648 0 0 0 .003-.551a1.26 1.26 0 0 0-.454-.446a.569.569 0 0 0-.539-.001m5.9-.016c-.158.072-.391.3-.472.462a.605.605 0 0 0-.012.525c.074.165 2.398 2.497 2.581 2.59c.259.133.525.068.793-.194c.264-.258.334-.538.2-.799c-.093-.183-2.425-2.507-2.59-2.581a.638.638 0 0 0-.5-.003m-3.008 1.011a.768.768 0 0 0-.353.215c-.138.186-.139.199-.139 1.997c0 1.432.006 1.695.041 1.813c.088.295.321.439.706.439c.385 0 .618-.144.706-.439c.062-.212.061-3.427-.002-3.612a.528.528 0 0 0-.284-.344c-.11-.06-.174-.075-.363-.082a1.537 1.537 0 0 0-.312.013"},null,-1),He=[Ue];function Ke(u,l){return r(),j("svg",We,[...He])}const Xe={name:"nonicons-loading16",render:Ke},Je={class:"inline-block",viewBox:"0 0 24 24",width:"1em",height:"1em"},Qe=m("path",{fill:"currentColor",d:"m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"},null,-1),Ye=[Qe];function Ze(u,l){return r(),j("svg",Je,[...Ye])}const Ge={name:"material-symbols-check-circle",render:Ze};function ne(u,l){return oe({url:"/job/log/list",method:"get",params:u,signal:l==null?void 0:l.signal})}function et(u){return oe({url:"/retry-task-log/message/list",method:"get",params:u})}const tt={class:"flex-center"},lt={class:"ml-6px"},nt={class:"flex-center gap-8px"},ot={class:"flex-center"},at={key:0,class:"empty-height flex-center"},st={class:"flex items-center"},it={class:"flex-center gap-8px"},rt={key:0,class:"h-full flex-center"},ct=K({name:"LogDrawer",__name:"log-drawer",props:ue({title:{default:void 0},drawer:{type:Boolean,default:!0},type:{default:"job"},taskData:{default:void 0},modelValue:{default:()=>[]}},{show:{type:Boolean,default:!1},showModifiers:{}}),emits:["update:show"],setup(u){const l=u,g=de(u,"show"),p=b(!1),z=b(!0),B=b([]),L=b(),y=b(1),f=b([]),T=b();let i=new AbortController;const o=b(!0);let w="0",S=0;const X=()=>{o.value=!0,clearTimeout(T.value),T.value=void 0},W=()=>{o.value||i.abort(),X(),w="0",S=0,f.value=[]};async function D(){clearTimeout(T.value);let n=null,e;if(l.type==="job"){const c=l.taskData,{data:d,error:a}=await ne({taskBatchId:c.taskBatchId,jobId:c.jobId,taskId:c.id,startId:w,fromIndex:S,size:50},i);n=d,e=a}if(l.type==="retry"){const c=l.taskData,{data:d,error:a}=await et({groupName:c.groupName,uniqueId:c.uniqueId,startId:w,fromIndex:S,size:50});n=d,e=a}!e&&n?(o.value=n.finished||y.value===0,w=n.nextStartId,S=n.fromIndex,n.message&&(f.value.push(...n.message),f.value.sort((c,d)=>Number.parseInt(c.time_stamp,10)-Number.parseInt(d.time_stamp,10)).forEach((c,d)=>c.index=d)),ve(()=>{var c;p.value&&((c=L.value)==null||c.scrollTo({position:"bottom",debounce:!0}))}),!o.value&&y.value!==0&&(T.value=setTimeout(D,y.value*1e3)),o.value&&y.value!==0&&setTimeout(()=>{J()},5*1e3)):(e==null?void 0:e.code)!=="ERR_CANCELED"&&W()}async function J(){if(clearTimeout(T.value),l.type==="job"&&y.value!==0){const n=l.taskData,{data:e,error:c}=await ne({taskBatchId:n.taskBatchId,jobId:n.jobId,taskId:n.id,startId:w,fromIndex:S,size:50},i);if(!c&&e){if(e.finished){T.value=setTimeout(J,5*1e3);return}await D()}}}_e(()=>{W()}),me(()=>g.value,async n=>{n&&l.modelValue&&(f.value=[...l.modelValue]),(n||!l.drawer)&&l.type&&l.taskData&&(o.value=!1,i=new AbortController,await D()),!n&&l.drawer&&W()},{immediate:!0});function ae(n){var N,F,V,q,A,x,Y,Z;const e=new Date(Number.parseInt(n==null?void 0:n.toString(),10)),c=e.getFullYear(),d=(e.getMonth()+1).toString().length===1?`0${e.getMonth()+1}`:(e.getMonth()+1).toString(),a=((N=e.getDate())==null?void 0:N.toString().length)===1?`0${e.getDate()}`:(F=e.getDate())==null?void 0:F.toString(),h=((V=e.getHours())==null?void 0:V.toString().length)===1?`0${e.getHours()}`:(q=e.getHours())==null?void 0:q.toString(),k=((A=e.getMinutes())==null?void 0:A.toString().length)===1?`0${e.getMinutes()}`:(x=e.getMinutes())==null?void 0:x.toString(),$=((Y=e.getSeconds())==null?void 0:Y.toString().length)===1?`0${e.getSeconds()}`:(Z=e.getSeconds())==null?void 0:Z.toString();return`${c}-${d}-${a} ${h}:${k}:${$}.${e.getMilliseconds()}`}const se=pe();function ie(){let n;l.type==="job"&&(n={type:l.type,taskBatchId:l.taskData.taskBatchId,jobId:l.taskData.jobId,taskId:l.taskData.id}),l.type==="retry"&&(n={type:l.type,groupName:l.taskData.groupName,uniqueId:l.taskData.uniqueId});const e=se.resolve({path:"/log",query:n});window.open(e.href)}const M=async n=>{if(n===-1){o.value&&(o.value=!1,await D());return}if(y.value=n,n===0){X();return}o.value=!1,await D()},R=b([{label:"Off",key:0},{label:"Auto(1s)",key:1},{label:"5s",key:5},{label:"10s",key:10},{label:"30s",key:30},{label:"1m",key:60},{label:"5m",key:300}]),Q=K({setup(){if(o.value&&f.value.length===0)return()=>t(H,{class:"h-full flex-center",size:"huge"},null);const n=a=>{const h=a.throwable;if(!h)return t(P,null,null);const k=h.match(/^.+/m);if(!k)return t(P,null,null);const $=h.replace(/^.+(\n|$)/m,"");return t(le,{title:k[0],name:`throwable-${a.index}`},{default:()=>[`${$}`]})},e=a=>{const h=a.message;if(!h)return t(P,null,null);const k=h.match(/^.+/m);if(!k)return t(P,null,null);const $=h.replace(/^.+(\n|$)/m,"").replaceAll(`
`,`
 - `);return $?t(le,{title:k[0],name:`message-${a.index}`},{default:()=>[` - ${$}`]}):t("div",{class:"pl-6px"},[I("- "),`${h}`])},c=a=>{B.value=a},d=a=>{B.value=[]};return()=>t("code",{class:"snail-log"},[t(Ie,{accordion:!0,"expanded-names":B.value,"onUpdate:expanded-names":a=>B.value=a,"on-update:expanded-names":c},{default:()=>[t(Te,{ref:L,class:"virtual-list",itemSize:85,"item-resizable":!0,"ignore-item-resize":!0,"padding-bottom":16,items:f.value,"scrollbar-props":{xScrollable:!0},"on-resize":d},{default:({item:a})=>t("pre",{key:a.index,class:"min-h-85px min-w-full"},[t("div",null,[t("span",{class:"log-hljs-time inline-block"},[ae(a.time_stamp)]),t("span",{class:`log-hljs-level-${a.level} ml-12px mr-12px inline-block`},[`${a.level}`]),t("span",{class:"log-hljs-thread mr-12px inline-block"},[`[${a.host}:${a.port}]`]),t("span",{class:"log-hljs-thread mr-12px inline-block"},[`[${a.thread}]`])]),t("div",{class:"log-hljs-location"},[`${a.location}: `]),t("div",null,[e(a)]),t("div",null,[n(a)]),t(ge,null,null)])})]})])}});return(n,e)=>{const c=Ge,d=be,a=Xe,h=Pe,k=ye,$=Ve,N=Ne,F=ke,V=xe,q=we,A=Se;return n.drawer?(r(),_(A,{key:0,show:g.value,"onUpdate:show":e[3]||(e[3]=x=>g.value=x),width:z.value?"100%":"50%","display-directive":"if","auto-focus":!1},{default:s(()=>[t(q,{closable:""},{header:s(()=>[m("div",{class:fe(["flex items-center justify-between",`tool-header${z.value?"-full":""}`])},[m("div",tt,[o.value?(r(),_(d,{key:0},{trigger:s(()=>[t(c,{class:"text-20px color-success"})]),default:s(()=>[I(" 日志加载完成 ")]),_:1})):(r(),_(d,{key:1},{trigger:s(()=>[t(v(E),{size:"small"},{icon:s(()=>[t(a)]),_:1})]),default:s(()=>[I(" 日志正在加载 ")]),_:1})),m("span",lt,U(n.title),1),t(v(ee),{trigger:"hover",options:R.value,width:"trigger",onSelect:M},{default:s(()=>[t(d,{placement:"right"},{trigger:s(()=>[t(v(te),{dashed:"",class:"ml-16px w-136px",onClick:e[0]||(e[0]=x=>M(-1))},{icon:s(()=>[m("div",nt,[t(h,{class:"text-18px"}),I(" "+U(R.value.filter(x=>x.key===y.value)[0].label)+" ",1),t(k,{icon:"material-symbols:expand-more-rounded"})])]),_:1})]),default:s(()=>[I(" 自动刷新频率 ")]),_:1})]),_:1},8,["options"])]),m("div",ot,[t(O,{size:"tiny","tooltip-content":p.value?"关闭自动滚动":"开启自动滚动",onClick:e[1]||(e[1]=()=>p.value=!p.value)},{default:s(()=>[p.value?(r(),_($,{key:0})):(r(),_(N,{key:1}))]),_:1},8,["tooltip-content"]),t(O,{size:"tiny",icon:"hugeicons:share-01","tooltip-content":"在新标签页打开",class:"ml-6px",onClick:ie}),t(O,{size:"tiny","tooltip-content":z.value?"半屏":"全屏",onClick:e[2]||(e[2]=()=>z.value=!z.value)},{default:s(()=>[z.value?(r(),_(F,{key:0})):(r(),_(V,{key:1}))]),_:1},8,["tooltip-content"])])],2)]),default:s(()=>[f.value.length===0?(r(),j("div",at,[f.value.length===0&&o.value?(r(),_(v(H),{key:0})):C("",!0),f.value.length===0&&!o.value?(r(),_(v(E),{key:1})):C("",!0)])):C("",!0),f.value.length>0?(r(),_(v(Q),{key:1})):C("",!0)]),_:1})]),_:1},8,["show","width"])):(r(),_(v(he),{key:1,bordered:!1,title:n.title,size:"small",class:"h-full sm:flex-1-hidden card-wrapper"},{"header-extra":s(()=>[m("div",st,[t(v(ee),{trigger:"hover",options:R.value,width:"trigger",onSelect:M},{default:s(()=>[t(d,{placement:"right"},{trigger:s(()=>[t(v(te),{dashed:"",class:"mx-12px w-136px",onClick:e[4]||(e[4]=x=>M(-1))},{icon:s(()=>[m("div",it,[t(h,{class:"text-18px"}),I(" "+U(R.value.filter(x=>x.key===y.value)[0].label)+" ",1),t(k,{icon:"material-symbols:expand-more-rounded"})])]),_:1})]),default:s(()=>[I(" 自动刷新频率 ")]),_:1})]),_:1},8,["options"]),t(O,{size:"tiny",class:"mr-12px","tooltip-content":p.value?"关闭自动滚动":"开启自动滚动",onClick:e[5]||(e[5]=()=>p.value=!p.value)},{default:s(()=>[p.value?(r(),_($,{key:0})):(r(),_(N,{key:1}))]),_:1},8,["tooltip-content"]),o.value?(r(),_(d,{key:0},{trigger:s(()=>[t(c,{class:"text-20px color-success"})]),default:s(()=>[I(" 日志加载完成 ")]),_:1})):(r(),_(d,{key:1},{trigger:s(()=>[t(v(E),{size:"small"},{icon:s(()=>[t(a)]),_:1})]),default:s(()=>[I(" 日志正在加载 ")]),_:1}))])]),default:s(()=>[f.value.length===0?(r(),j("div",rt,[f.value.length===0&&o.value?(r(),_(v(H),{key:0})):C("",!0),f.value.length===0&&!o.value?(r(),_(v(E),{key:1})):C("",!0)])):C("",!0),t(v(Q))]),_:1},8,["title"]))}}}),_t=$e(ct,[["__scopeId","data-v-c7aad05f"]]);export{_t as _,Pe as a,Ge as b,Xe as c,et as f};
