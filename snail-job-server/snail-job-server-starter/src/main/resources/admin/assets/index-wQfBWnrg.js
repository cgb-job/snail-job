import{d,cC as p,cE as w,c2 as k,z as r,i as _,o as v,c as g,h as y,cG as S,cD as $,$ as h}from"./index-D3rICic-.js";import{_ as x}from"./workflow.vue_vue_type_script_setup_true_lang-CDR_Hxib.js";import"./DescriptionsItem-LhWljJnV.js";import"./Grid-CRDcRyPk.js";import"./index-2ay5PpNs.js";const R=d({name:"workflow_form_copy",__name:"index",setup(C){const s=p(),c=w(),n=k(),a=r(!1),l=String(c.query.id),e=r({workflowName:`Workflow ${new Date().getTime()}`,workflowStatus:1,blockStrategy:1,description:void 0,executorTimeout:60}),u=async()=>{a.value=!0;const{data:t,error:o}=await S(l);o||(e.value=t),a.value=!1};_(()=>{s.clear(),s.setType(0),u()});const i=async()=>{var o;const{error:t}=await $(e.value);t||((o=window.$message)==null||o.info(h("common.addSuccess")),n.push("/workflow/task"))},f=()=>{n.push("/workflow/task")};return(t,o)=>(v(),g(y(x),{modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=m=>e.value=m),spinning:a.value,onSave:i,onCancel:f},null,8,["modelValue","spinning"]))}});export{R as default};
