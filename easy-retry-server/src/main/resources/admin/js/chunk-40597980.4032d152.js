(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40597980"],{"00d8":function(e,r){(function(){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t={rotl:function(e,r){return e<<r|e>>>32-r},rotr:function(e,r){return e<<32-r|e>>>r},endian:function(e){if(e.constructor==Number)return 16711935&t.rotl(e,8)|4278255360&t.rotl(e,24);for(var r=0;r<e.length;r++)e[r]=t.endian(e[r]);return e},randomBytes:function(e){for(var r=[];e>0;e--)r.push(Math.floor(256*Math.random()));return r},bytesToWords:function(e){for(var r=[],t=0,n=0;t<e.length;t++,n+=8)r[n>>>5]|=e[t]<<24-n%32;return r},wordsToBytes:function(e){for(var r=[],t=0;t<32*e.length;t+=8)r.push(e[t>>>5]>>>24-t%32&255);return r},bytesToHex:function(e){for(var r=[],t=0;t<e.length;t++)r.push((e[t]>>>4).toString(16)),r.push((15&e[t]).toString(16));return r.join("")},hexToBytes:function(e){for(var r=[],t=0;t<e.length;t+=2)r.push(parseInt(e.substr(t,2),16));return r},bytesToBase64:function(e){for(var t=[],n=0;n<e.length;n+=3)for(var o=e[n]<<16|e[n+1]<<8|e[n+2],a=0;a<4;a++)8*n+6*a<=8*e.length?t.push(r.charAt(o>>>6*(3-a)&63)):t.push("=");return t.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],n=0,o=0;n<e.length;o=++n%4)0!=o&&t.push((r.indexOf(e.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|r.indexOf(e.charAt(n))>>>6-2*o);return t}};e.exports=t})()},"044b":function(e,r){function t(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function n(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&t(e.slice(0,0))}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(t(e)||n(e)||!!e._isBuffer)}},6821:function(e,r,t){(function(){var r=t("00d8"),n=t("9a634").utf8,o=t("044b"),a=t("9a634").bin,s=function(e,t){e.constructor==String?e=t&&"binary"===t.encoding?a.stringToBytes(e):n.stringToBytes(e):o(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var u=r.bytesToWords(e),i=8*e.length,c=1732584193,l=-271733879,f=-1732584194,p=271733878,h=0;h<u.length;h++)u[h]=16711935&(u[h]<<8|u[h]>>>24)|4278255360&(u[h]<<24|u[h]>>>8);u[i>>>5]|=128<<i%32,u[14+(i+64>>>9<<4)]=i;var d=s._ff,m=s._gg,g=s._hh,v=s._ii;for(h=0;h<u.length;h+=16){var b=c,y=l,w=f,T=p;c=d(c,l,f,p,u[h+0],7,-680876936),p=d(p,c,l,f,u[h+1],12,-389564586),f=d(f,p,c,l,u[h+2],17,606105819),l=d(l,f,p,c,u[h+3],22,-1044525330),c=d(c,l,f,p,u[h+4],7,-176418897),p=d(p,c,l,f,u[h+5],12,1200080426),f=d(f,p,c,l,u[h+6],17,-1473231341),l=d(l,f,p,c,u[h+7],22,-45705983),c=d(c,l,f,p,u[h+8],7,1770035416),p=d(p,c,l,f,u[h+9],12,-1958414417),f=d(f,p,c,l,u[h+10],17,-42063),l=d(l,f,p,c,u[h+11],22,-1990404162),c=d(c,l,f,p,u[h+12],7,1804603682),p=d(p,c,l,f,u[h+13],12,-40341101),f=d(f,p,c,l,u[h+14],17,-1502002290),l=d(l,f,p,c,u[h+15],22,1236535329),c=m(c,l,f,p,u[h+1],5,-165796510),p=m(p,c,l,f,u[h+6],9,-1069501632),f=m(f,p,c,l,u[h+11],14,643717713),l=m(l,f,p,c,u[h+0],20,-373897302),c=m(c,l,f,p,u[h+5],5,-701558691),p=m(p,c,l,f,u[h+10],9,38016083),f=m(f,p,c,l,u[h+15],14,-660478335),l=m(l,f,p,c,u[h+4],20,-405537848),c=m(c,l,f,p,u[h+9],5,568446438),p=m(p,c,l,f,u[h+14],9,-1019803690),f=m(f,p,c,l,u[h+3],14,-187363961),l=m(l,f,p,c,u[h+8],20,1163531501),c=m(c,l,f,p,u[h+13],5,-1444681467),p=m(p,c,l,f,u[h+2],9,-51403784),f=m(f,p,c,l,u[h+7],14,1735328473),l=m(l,f,p,c,u[h+12],20,-1926607734),c=g(c,l,f,p,u[h+5],4,-378558),p=g(p,c,l,f,u[h+8],11,-2022574463),f=g(f,p,c,l,u[h+11],16,1839030562),l=g(l,f,p,c,u[h+14],23,-35309556),c=g(c,l,f,p,u[h+1],4,-1530992060),p=g(p,c,l,f,u[h+4],11,1272893353),f=g(f,p,c,l,u[h+7],16,-155497632),l=g(l,f,p,c,u[h+10],23,-1094730640),c=g(c,l,f,p,u[h+13],4,681279174),p=g(p,c,l,f,u[h+0],11,-358537222),f=g(f,p,c,l,u[h+3],16,-722521979),l=g(l,f,p,c,u[h+6],23,76029189),c=g(c,l,f,p,u[h+9],4,-640364487),p=g(p,c,l,f,u[h+12],11,-421815835),f=g(f,p,c,l,u[h+15],16,530742520),l=g(l,f,p,c,u[h+2],23,-995338651),c=v(c,l,f,p,u[h+0],6,-198630844),p=v(p,c,l,f,u[h+7],10,1126891415),f=v(f,p,c,l,u[h+14],15,-1416354905),l=v(l,f,p,c,u[h+5],21,-57434055),c=v(c,l,f,p,u[h+12],6,1700485571),p=v(p,c,l,f,u[h+3],10,-1894986606),f=v(f,p,c,l,u[h+10],15,-1051523),l=v(l,f,p,c,u[h+1],21,-2054922799),c=v(c,l,f,p,u[h+8],6,1873313359),p=v(p,c,l,f,u[h+15],10,-30611744),f=v(f,p,c,l,u[h+6],15,-1560198380),l=v(l,f,p,c,u[h+13],21,1309151649),c=v(c,l,f,p,u[h+4],6,-145523070),p=v(p,c,l,f,u[h+11],10,-1120210379),f=v(f,p,c,l,u[h+2],15,718787259),l=v(l,f,p,c,u[h+9],21,-343485551),c=c+b>>>0,l=l+y>>>0,f=f+w>>>0,p=p+T>>>0}return r.endian([c,l,f,p])};s._ff=function(e,r,t,n,o,a,s){var u=e+(r&t|~r&n)+(o>>>0)+s;return(u<<a|u>>>32-a)+r},s._gg=function(e,r,t,n,o,a,s){var u=e+(r&n|t&~n)+(o>>>0)+s;return(u<<a|u>>>32-a)+r},s._hh=function(e,r,t,n,o,a,s){var u=e+(r^t^n)+(o>>>0)+s;return(u<<a|u>>>32-a)+r},s._ii=function(e,r,t,n,o,a,s){var u=e+(t^(r|~n))+(o>>>0)+s;return(u<<a|u>>>32-a)+r},s._blocksize=16,s._digestsize=16,e.exports=function(e,t){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var n=r.wordsToBytes(s(e,t));return t&&t.asBytes?n:t&&t.asString?a.bytesToString(n):r.bytesToHex(n)}})()},"88bc":function(e,r,t){(function(r){var t=1/0,n=9007199254740991,o="[object Arguments]",a="[object Function]",s="[object GeneratorFunction]",u="[object Symbol]",i="object"==typeof r&&r&&r.Object===Object&&r,c="object"==typeof self&&self&&self.Object===Object&&self,l=i||c||Function("return this")();function f(e,r,t){switch(t.length){case 0:return e.call(r);case 1:return e.call(r,t[0]);case 2:return e.call(r,t[0],t[1]);case 3:return e.call(r,t[0],t[1],t[2])}return e.apply(r,t)}function p(e,r){var t=-1,n=e?e.length:0,o=Array(n);while(++t<n)o[t]=r(e[t],t,e);return o}function h(e,r){var t=-1,n=r.length,o=e.length;while(++t<n)e[o+t]=r[t];return e}var d=Object.prototype,m=d.hasOwnProperty,g=d.toString,v=l.Symbol,b=d.propertyIsEnumerable,y=v?v.isConcatSpreadable:void 0,w=Math.max;function T(e,r,t,n,o){var a=-1,s=e.length;t||(t=S),o||(o=[]);while(++a<s){var u=e[a];r>0&&t(u)?r>1?T(u,r-1,t,n,o):h(o,u):n||(o[o.length]=u)}return o}function j(e,r){return e=Object(e),x(e,r,(function(r,t){return t in e}))}function x(e,r,t){var n=-1,o=r.length,a={};while(++n<o){var s=r[n],u=e[s];t(u,s)&&(a[s]=u)}return a}function _(e,r){return r=w(void 0===r?e.length-1:r,0),function(){var t=arguments,n=-1,o=w(t.length-r,0),a=Array(o);while(++n<o)a[n]=t[r+n];n=-1;var s=Array(r+1);while(++n<r)s[n]=t[n];return s[r]=a,f(e,this,s)}}function S(e){return O(e)||A(e)||!!(y&&e&&e[y])}function B(e){if("string"==typeof e||k(e))return e;var r=e+"";return"0"==r&&1/e==-t?"-0":r}function A(e){return C(e)&&m.call(e,"callee")&&(!b.call(e,"callee")||g.call(e)==o)}var O=Array.isArray;function N(e){return null!=e&&I(e.length)&&!q(e)}function C(e){return F(e)&&N(e)}function q(e){var r=L(e)?g.call(e):"";return r==a||r==s}function I(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=n}function L(e){var r=typeof e;return!!e&&("object"==r||"function"==r)}function F(e){return!!e&&"object"==typeof e}function k(e){return"symbol"==typeof e||F(e)&&g.call(e)==u}var E=_((function(e,r){return null==e?{}:j(e,p(T(r,1),B))}));e.exports=E}).call(this,t("c8ba"))},"9a634":function(e,r){var t={utf8:{stringToBytes:function(e){return t.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(t.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var r=[],t=0;t<e.length;t++)r.push(255&e.charCodeAt(t));return r},bytesToString:function(e){for(var r=[],t=0;t<e.length;t++)r.push(String.fromCharCode(e[t]));return r.join("")}}};e.exports=t},bf80:function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e._self._c;return r("a-card",{staticClass:"card",attrs:{title:"组配置",bordered:!1}},[r("a-form",e._b({attrs:{form:e.form,"body-style":{padding:"24px 32px"}},on:{submit:e.handleSubmit}},"a-form",e.formItemLayout,!1),[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id"],expression:"['id']"}],attrs:{hidden:""}})],1),r("a-form-item",{attrs:{label:"用户名"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"请输入用户名",whitespace:!0}]}],expression:"[\n          'username',\n          {rules: [{ required: true, message: '请输入用户名', whitespace: true}]}\n        ]"}],attrs:{placeholder:"请输入用户名"}})],1),r("a-form-item",{attrs:{label:"密码"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:"create"===e.formType,message:"请输入密码",whitespace:!0}]}],expression:"[\n          'password',\n          {rules: [{ required: formType === 'create', message: '请输入密码', whitespace: true}]}\n        ]"}],attrs:{placeholder:"请输入密码"}})],1),r("a-form-item",{attrs:{label:"角色"}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["role",{rules:[{required:!0,message:"请选择角色"}]}],expression:"[\n          'role',\n          {rules: [{ required: true, message: '请选择角色'}]}\n        ]"}],attrs:{placeholder:"请选择角色"},on:{change:function(r){return e.handleChange(r)}}},[r("a-select-option",{attrs:{value:"1"}},[e._v("普通用户")]),r("a-select-option",{attrs:{value:"2"}},[e._v("管理员")])],1)],1),"2"!==e.role?r("a-form-item",{attrs:{label:"权限"}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["groupNameList",{rules:[{required:!0,message:"请分配组"}]}],expression:"[\n          'groupNameList',\n          {rules: [{ required: true, message: '请分配组'}]}\n        ]"}],staticStyle:{width:"100%"},attrs:{mode:"tags","token-separators":[","]}},e._l(e.groupNameList,(function(t,n){return r("a-select-option",{key:n,attrs:{value:t}},[e._v(" "+e._s(t)+" ")])})),1)],1):e._e(),r("a-form-item",{attrs:{"wrapper-col":{xs:{span:24,offset:0},sm:{span:16,offset:8},lg:{span:7}}}},[r("a-button",{attrs:{htmlType:"submit",type:"primary"}},[e._v("提交")])],1)],1)],1)},o=[],a=(t("ac1f"),t("d3b7"),t("25f0"),t("6821")),s=t.n(a),u=t("0fea"),i=t("88bc"),c=t.n(i),l={name:"UserForm",props:{},data:function(){return{form:this.$form.createForm(this),role:0,formType:"create",formItemLayout:{labelCol:{lg:{span:7},sm:{span:7}},wrapperCol:{lg:{span:10},sm:{span:17}}},groupNameList:[]}},mounted:function(){var e=this;Object(u["g"])().then((function(r){e.groupNameList=r.data})),this.$nextTick((function(){e.$route.query.username&&Object(u["t"])({username:e.$route.query.username}).then((function(r){e.loadEditInfo(r.data)}))}))},methods:{handleChange:function(e){this.role=e},handleSubmit:function(e){var r=this;e.preventDefault(),this.form.validateFields((function(e,t){e||(t.password&&(t.password=s()(t.password)),t.role=parseInt(t.role),Object(u["B"])(t).then((function(e){r.$message.success("操作成功"),r.$router.push("/user-list")})))}))},validate:function(e,r,t){var n=/^user-(.*)$/;n.test(r)||t(new Error("需要以 user- 开头")),t()},loadEditInfo:function(e){this.formType="edit";var r=this.form;new Promise((function(e){setTimeout(e,1500)})).then((function(){var t=c()(e,["id","username","role","groupNameList"]);t.role=t.role.toString(),r.setFieldsValue(t)}))}}},f=l,p=t("2877"),h=Object(p["a"])(f,n,o,!1,null,"56a81628",null);r["default"]=h.exports}}]);