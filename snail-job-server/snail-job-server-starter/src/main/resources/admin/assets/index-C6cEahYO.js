import{d as c,cC as d,cE as f,z as r,i as m,o as p,c as _,h as v,cG as g}from"./index-D3rICic-.js";import{_ as w}from"./workflow.vue_vue_type_script_setup_true_lang-CDR_Hxib.js";import"./DescriptionsItem-LhWljJnV.js";import"./Grid-CRDcRyPk.js";import"./index-2ay5PpNs.js";const I=c({name:"workflow_form_detail",__name:"index",setup(k){const o=d(),l=f(),a=r(!1),t=String(l.query.id),n=r({}),i=async()=>{a.value=!0;const{data:s,error:e}=await g(t);e||(n.value=s),a.value=!1};return m(()=>{o.clear(),o.setType(1),o.setId(t),i()}),(s,e)=>(p(),_(v(w),{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=u=>n.value=u),spinning:a.value,disabled:""},null,8,["modelValue","spinning"]))}});export{I as default};
