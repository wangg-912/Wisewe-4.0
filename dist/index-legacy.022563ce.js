var __vite_style__=document.createElement("style");__vite_style__.innerHTML='@charset "UTF-8";:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}:export{theme:#fff}.el-dialog__header{padding:10px 8px 10px!important;border-bottom:1px solid #e8e8e8}.el-dialog__footer{padding:10px 8px 10px!important;border-top:1px solid #e8e8e8}.dialog-slot-title{display:flex;flex-flow:revert;justify-content:space-between}.wisewe-basic-modal-toolbar__icon{font-size:16px;padding-left:8px;cursor:pointer}.wisewe-basic-modal-toolbar__icon:hover{font-weight:700}.wisewe-dialog-wrapper.el-scrollbar .el-scrollbar__bar.is-horizontal{height:0!important}.wisewe-dialog-wrapper .el-loading-spinner{left:50%!important;margin-left:-50%!important}[data-v-5cc8b29b]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-5cc8b29b]:export{theme:#fff}.wisewe-basic-title[data-v-5cc8b29b]{position:relative;display:flex;padding-left:0;font-size:16px;font-weight:700;line-height:24px;color:#333;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wisewe-basic-title.show-span[data-v-5cc8b29b]::before{position:absolute;top:4px;left:0;width:3px;height:16px;margin-right:4px;background:#1890ff;content:""}',document.head.appendChild(__vite_style__),System.register(["./element-plus-legacy.7e7b8f5e.js","./index-legacy.3c9d9e06.js","./useAttrs-legacy.6062cc02.js","./omit-legacy.b7ecd1b4.js","./isEqual-legacy.674c912f.js","./_baseIsEqual-legacy.c646f212.js","./isObject-legacy.2ad11661.js","./_baseGet-legacy.b0b1e939.js","./isSymbol-legacy.fe622f05.js"],(function(e){"use strict";var t,o,l,n,i,a,r,s,c,d,u,f,g,p,h,b,m,v,C,y,w,k,x,_,F,O,H,S,D,R,$,T,j,P,B,M,E,W,I,z,V,A,q,L,N,X;return{setters:[function(e){t=e.w,o=e.a,l=e.Q,n=e.u,i=e.d,a=e.E,r=e.l,s=e.R,c=e.v,d=e.S,u=e.c,f=e.j,g=e.k,p=e.L,h=e.B,b=e.U,m=e.C,v=e.f,C=e.m,y=e.V,w=e.A,k=e.M,x=e.o,_=e.n,F=e.W,O=e.X,H=e.P,S=e.g,D=e.Y,R=e.Z,$=e.r,T=e.t},function(e){j=e.p,P=e.l,B=e.t,M=e.b,E=e.m,W=e.n,I=e.o,z=e.q,V=e.s,A=e.v},function(e){q=e.u},function(e){L=e.o,N=e.i},function(e){X=e.i},function(){},function(){},function(){},function(){}],execute:function(){const Y=(...e)=>e,J=Y("primary","success","warning","danger","info","text"),U=Y("plain","circle","round"),G=Y("medium ","small","mini"),Q={visible:j.bool,width:j.number.def(640),height:j.number.def(400),draggable:j.bool.def(!0),cancelText:j.string.def("取消"),okText:j.string.def("确定"),okType:j.string.def("primary"),showClose:j.bool.def(!0),modal:j.bool.def(!0),size:j.oneOf(G).def("mini"),type:j.oneOf(J).def("info"),shape:j.oneOf(U).def("plain"),disabled:j.bool.def(!1),icon:j.string,autofocus:j.bool.def(!1),"native-type":j.oneOf(["button","submit","reset"]).def("button")},Z=Object.assign({},Q,{title:j.string.def("标题"),titleIcon:j.bool,fullscreen:j.bool.def("false"),canFullscreen:j.bool.def(!0),wrapperFooterOffset:j.number.def(0),useWrapper:j.bool.def(!0),loading:j.bool,showCancelBtn:j.bool.def(!0),showOkBtn:j.bool.def(!0),wrapperProps:Object,bodyStyle:Object,closeIcon:Object,destroyOnClose:j.bool.def(!0),footer:Object,open:Function,close:Function,save:Function,beforeClose:Function,closeOnClickModal:j.bool.def(!1),visible:j.bool,customClass:j.string,renderFrame:j.bool.def(!1),indata:{type:Object,default:null},closeOnPressEscape:j.bool.def(!1)});function K(e,l,n=!1){if(!P(e))throw new Error("handle is not Function!");const{readyRef:i,stop:a,start:r}=function(e){const t=o(!1);let l;function n(){t.value=!1,l&&window.clearTimeout(l)}function i(){n(),l=setTimeout((()=>{t.value=!0}),e)}return i(),B(n),{readyRef:t,stop:n,start:i}}(l);return n?e():t(i,(t=>{t&&e()}),{immediate:!1}),{readyRef:i,stop:a,start:r}}function ee(e){const t=(e,t)=>getComputedStyle(e)[t],o=o=>{if(!o)return;o.setAttribute("data-drag",n(e.draggable));const l=o.querySelector(".el-dialog__header"),i=o.querySelector(".el-dialog");l&&i&&n(e.draggable)&&(l.style.cursor="move",l.onmousedown=e=>{if(!e)return;const o=e.clientX,l=e.clientY,n=document.body.clientWidth,a=document.documentElement.clientHeight,r=i.offsetWidth,s=i.offsetHeight,c=i.offsetLeft,d=n-i.offsetLeft-r,u=i.offsetTop,f=a-i.offsetTop-s,g=t(i,"left"),p=t(i,"top");let h=+g,b=+p;g.includes("%")?(h=+document.body.clientWidth*(+g.replace(/%/g,"")/100),b=+document.body.clientHeight*(+p.replace(/%/g,"")/100)):(h=+g.replace(/px/g,""),b=+p.replace(/px/g,"")),document.onmousemove=function(e){let t=e.clientX-o,n=e.clientY-l;-t>c?t=-c:t>d&&(t=d),-n>u?n=-u:n>f&&(n=f),i.style.cssText+=`;left:${t+h}px;top:${n+b}px;`},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null}})};l((()=>{n(e.visible)&&n(e.draggable)&&K((()=>{(()=>{const l=document.querySelectorAll(".el-overlay");for(const i of Array.from(l)){if(!i)continue;const l=t(i,"display"),a=i.getAttribute("data-drag");"none"!==l&&(null===a||n(e.destroyOnClose))&&o(i)}})()}),30)}))}function te(e,t=[]){const o=Object.keys(e),l={};return o.map((o=>{if(t.includes(o))return null;l[o]=()=>function(e,t="default",o){if(!e||!Reflect.has(e,t))return null;if(!P(e[t]))return null;const l=e[t];return l?l(o):null}(e,o)})),l}var oe=i({name:"Dialog",inheritAttrs:!1,props:Z,setup(e,{slots:t}){const{visible:o,draggable:l,destroyOnClose:i}=a(e),u=q();return ee({visible:o,destroyOnClose:i,draggable:l}),()=>{let o;const l={...n(u),...e};return r(d,c({"model-value":l.visible},l,{showClose:!1}),"function"==typeof(i=o=te(t))||"[object Object]"===Object.prototype.toString.call(i)&&!s(i)?o:{default:()=>[o]});var i}}}),le=i({name:"DialogToolbar",props:{showClose:j.bool.def(!0),canFullscreen:j.bool.def(!0),fullscreen:j.bool},emits:["close","fullscreen"],setup(e,{emit:t}){const{prefixCls:o}=M("basic-modal-toolbar");return{getToolCls:u((()=>[o,`${o}--custom`,{[`${o}--can-full`]:e.canFullscreen}])),prefixCls:o,handleCancel:function(){t("close")},handleFullScreen:function(e){e?.stopPropagation(),e?.preventDefault(),t("fullscreen")}}}});le.render=function(e,t,o,l,n,i){return f(),g("div",{class:e.getToolCls},[e.canFullscreen?(f(),g(p,{key:0},[e.fullscreen?(f(),g("i",{key:1,class:["el-icon-crop",`${e.prefixCls}__icon`],role:"close",onClick:t[2]||(t[2]=(...t)=>e.handleFullScreen&&e.handleFullScreen(...t))},null,2)):(f(),g("i",{key:0,class:["el-icon-full-screen",`${e.prefixCls}__icon`],role:"full",onClick:t[1]||(t[1]=(...t)=>e.handleFullScreen&&e.handleFullScreen(...t))},null,2))],64)):h("",!0),e.showClose?(f(),g("i",{key:1,class:["el-icon-close",`${e.prefixCls}__icon`],onClick:t[3]||(t[3]=(...t)=>e.handleCancel&&e.handleCancel(...t))},null,2)):h("",!0)],2)};var ne=i({name:"BasicTitle",props:{span:j.bool},setup(){const{prefixCls:e}=M("basic-title");return{prefixCls:e}}});const ie=m()(((e,t,o,l,n,i)=>(f(),g("span",{class:[e.prefixCls,{"show-span":e.span&&e.$slots.default}]},[b(e.$slots,"default",{},void 0,!0)],2))));ne.render=ie,ne.__scopeId="data-v-5cc8b29b";var ae=i({name:"DialogHeader",components:{BasicTitle:ne},props:{title:j.string,icon:j.string}});ae.render=function(e,t,o,l,n,i){const a=v("BasicTitle");return f(),g(a,null,{default:C((()=>[e.icon?(f(),g("i",{key:0,class:e.icon,size:"18",style:{display:"flex","justify-content":"center","align-items":"center","padding-right":"4px"}},null,2)):h("",!0),y(" "+w(e.title),1)])),_:1})};const re=Symbol();var se=i({name:"DialogWrapper",inheritAttrs:!1,props:{loading:j.bool,useWrapper:j.bool.def(!0),modalHeaderHeight:j.number.def(45),modalFooterHeight:j.number.def(55),width:j.number.def(640),height:j.number,footerOffset:j.number.def(0),visible:j.bool,fullscreen:j.bool,renderFrame:j.bool.def(!1)},emits:["height-change","ext-height"],setup(e,{emit:i}){const{prefixCls:a}=M("dialog-wrapper"),r=o(null),s=o(null),c=o(0),d=o(0);o(null);let f=0;W(p.bind(null,!1)),E({redoModalHeight:p},re);const g=u((()=>({width:`${e.width}px`,height:`${n(c)}px`,padding:"8px"})));async function p(){if(!e.visible)return;const t=n(r);if(!t)return;const o=t.$el.parentElement;if(o){o.style.padding="0",await _();try{const t=o.parentElement&&o.parentElement.parentElement;if(!t)return;const l=getComputedStyle(t).top,a=Number.parseInt(l);let r=window.innerHeight-2*a+(e.footerOffset||0)-e.modalFooterHeight-e.modalHeaderHeight;await _();const d=n(s);if(!d)return;await _(),f=d.scrollHeight,e.fullscreen?c.value=window.innerHeight-e.modalFooterHeight-e.modalHeaderHeight:c.value=e.height?e.height:f>r?r:f,i("height-change",n(c))}catch(A){}}}return l((()=>{e.useWrapper&&p()})),t((()=>e.fullscreen),(e=>{p(),e?d.value=c.value:c.value=d.value})),k((()=>{const{modalHeaderHeight:t,modalFooterHeight:o}=e;i("ext-height",t+o)})),x((()=>{})),{prefixCls:a,wrapperRef:r,spinRef:s,spinStyle:g,setModalHeight:p}}});se.render=function(e,t,o,l,n,i){const a=v("el-scrollbar"),s=F("loading");return f(),g(a,{ref:"wrapperRef",class:e.prefixCls},{default:C((()=>[O(r("div",{ref:"spinRef",style:e.spinStyle,"element-loading-text":e.loadingTip},[b(e.$slots,"default")],12,["element-loading-text"]),[[s,e.loading]])])),_:3},8,["class"])};var ce=i({name:"DialogFooter",props:Z,emits:["save","close"],setup:(e,{emit:t})=>({handleOk:function(){t("save")},handleCancel:function(){t("close")}})});ce.render=function(e,t,o,l,n,i){const a=v("el-button");return f(),g("div",null,[b(e.$slots,"insertFooter"),e.showCancelBtn?(f(),g(a,{key:0,type:"info",onClick:e.handleCancel,size:e.size},{default:C((()=>[y(w(e.cancelText),1)])),_:1},8,["onClick","size"])):h("",!0),b(e.$slots,"centerFooter"),e.showOkBtn?(f(),g(a,{key:1,type:e.okType,onClick:e.handleOk,size:e.size},{default:C((()=>[y(w(e.okText),1)])),_:1},8,["type","onClick","size"])):h("",!0),b(e.$slots,"appendFooter")])};var de=i({name:"BasicDialog",components:{Dialog:oe,DialogToolbar:le,DialogHeader:ae,DialogWrapper:se,DialogFooter:ce},inheritAttrs:!1,props:Z,emits:["visible-change","height-change","cancel","save","register"],setup(e,{emit:i,attrs:a}){const r=o(null),s=o(!1),c=o(null),d=o(null),f=o(null),g=o(0),p={setModalProps:function(e){if(c.value=I(n(c)||{},e),!Reflect.has(e,"visible"))return;s.value=!!e.visible},emitVisible:void 0,redoModalHeight:()=>{_((()=>{n(d)&&n(d).setModalHeight()}))},callbackFn:e=>k(e)},h=S();h&&i("register",p,h.uid);const b=u((()=>({...e,...n(c),dialogId:`${h.uid}`,iframeId:`iframe_${h.uid}`}))),{handleFullScreen:m,getCustomClass:v,fullScreenRef:C}=function(e){const t=o(!1);return{getCustomClass:u((()=>{const o=n(e.customClass)||"";return n(t)?`is-fullscreen ${o} `:n(o)})),handleFullScreen:function(e){e&&e.stopPropagation(),t.value=!n(t)},fullScreenRef:t}}({modalWrapperRef:d,extHeightRef:g,customClass:H(b.value,"customClass")}),y=u((()=>({...{...n(b),visible:n(s),title:void 0},customClass:n(v.value)}))),w=u((()=>{const{url:e,dialogId:t}=n(y);return e&&(/^(http|https|www)/g.test(e)||e.includes(".html"))?{...a,...n(y),url:e.includes("?")?`${e}&dialogId=${t}`:`${e}?dialogId=${t}`,renderFrame:!0}:{...a,...n(y)}}));function k(e){const{type:t,data:o}=e;if(t&&!N(o)){const{callback:e}=w.value;e&&P(e)&&(e.call(this,o),s.value=!1,i("close")),i("callback")}}return l((()=>{s.value=!!e.visible,C.value=!!e.fullscreen})),t((()=>n(s)),(e=>{i("visible-change",e),h&&p.emitVisible?.(e,h.uid),_((()=>{}))}),{immediate:!1}),{frameRef:f,dialogRef:r,visibleRef:s,modalWrapperRef:d,getProps:y,fullScreenRef:C,getMergeProps:b,getBindValue:w,handleFullScreen:m,omit:L,handleOk:function(){const e=n(f);if(e){const t=e.contentWindow.dialogOk();i("save",t)}else i("save")},handleCancel:async function(t){if(t?.stopPropagation(),e.close&&P(e.close)){const t=await e.close();s.value=!t}else s.value=!1,i("cancel")},handleCallBack:k,handleExtHeight:function(e){g.value=e},handleHeightChange:function(e){i("height-change",e)},handleTitleDbClick:function(t){e.canFullscreen&&(t.stopPropagation(),m(t))}}}});const ue={class:"dialog-slot-title"};de.render=function(e,t,o,l,n,i){const a=v("DialogHeader"),s=v("DialogToolbar"),d=v("DialogFooter"),u=v("DialogWrapper"),p=v("Dialog");return f(),g(p,c({ref:"dialogRef",onOpen:e.handleOpen,onClose:e.handleCancel},e.getBindValue,{fullscreen:e.fullScreenRef}),D({default:C((()=>[r(u,c({useWrapper:e.getProps.useWrapper,footerOffset:e.wrapperFooterOffset,ref:"modalWrapperRef",loading:e.getProps.loading,width:e.getProps.width,height:e.getProps.height,visible:e.visibleRef,fullscreen:e.fullScreenRef,renderFrame:e.getProps.renderFrame,indata:e.getProps.indata,url:e.getProps.url,modalFooterHeight:void 0===e.footer||e.footer?void 0:0},e.omit(e.getProps.wrapperProps,"visible","height"),{onExtHeight:e.handleExtHeight,onHeightChange:e.handleHeightChange}),{default:C((()=>[e.getBindValue.renderFrame&&e.getBindValue.url?(f(),g("iframe",{key:0,ref:"frameRef",id:e.getBindValue.iframeId,src:e.getBindValue.url,frameborder:"0",style:{width:"100%","min-height":"100%",overflow:"auto"}},null,8,["id","src"])):b(e.$slots,"default",{key:1})])),_:3},16,["useWrapper","footerOffset","loading","width","height","visible","fullscreen","renderFrame","indata","url","modalFooterHeight","onExtHeight","onHeightChange"])])),_:2},[e.$slots.title?void 0:{name:"title",fn:C((()=>[r("div",ue,[r(a,{title:e.getMergeProps.title,icon:e.getMergeProps.titleIcon,onDblclick:e.handleTitleDbClick},null,8,["title","icon","onDblclick"]),r(s,{showClose:e.getBindValue.showClose,fullscreen:e.fullScreenRef,onClose:e.handleCancel,onFullscreen:e.handleFullScreen},null,8,["showClose","fullscreen","onClose","onFullscreen"])])]))},e.$slots.footer?void 0:{name:"footer",fn:C((()=>[r(d,c(e.getProps,{onSave:e.handleOk,onClose:e.handleCancel}),D({_:2},[R(Object.keys(e.$slots),(t=>({name:t,fn:C((o=>[b(e.$slots,t,o)]))})))]),1040,["onSave","onClose"])]))},R(Object.keys(e.omit(e.$slots,"default")),(t=>({name:t,fn:C((o=>[b(e.$slots,t,o)]))})))]),1040,["onOpen","onClose","fullscreen"])};const fe=$({}),ge=$({});function pe(){z();const e=o(null),t=o(!1),l=o("");window.addEventListener("message",(e=>{const{gid:t,callbackData:o}=e.data;if(l.value==t){const{indata:t}=fe[n(l)];if(t){const o=JSON.stringify(t);e.source.postMessage(Object.assign({},JSON.parse(o)))}o&&i()?.callbackFn({type:"ok",data:o})}}),!1);const i=()=>{const t=n(e);return t||A("useDialog instance is undefined!"),t};return[function(o,i){l.value=i,x((()=>{e.value=null,t.value=!1,fe[n(l)]=null})),n(t)&&V()&&o===n(e)||(e.value=o,o.emitVisible=(e,t)=>{ge[t]=e})},{callbackFn:(e="ok",t)=>i()?.callbackFn?.({type:"ok",data:t}),setModalProps:e=>{i()?.setModalProps(e)},getVisible:u((()=>ge[~~n(l)])),redoModalHeight:()=>{i()?.redoModalHeight?.()},openDialog:(e,t=!0,o=!0)=>{const a=Object.assign({loading:!0},e,{visible:t,renderFrame:!!e?.url});if(i()?.setModalProps(a),a.loading&&setTimeout((()=>{i()?.setModalProps({loading:!1}),clearTimeout(undefined)}),650),o)return fe[n(l)]=null,void(fe[n(l)]=e);X(T(fe[n(l)]),e)||(fe[n(l)]=e)}}]}var he=e("default",i({components:{BasicDialog:de},setup(){const[e,{openDialog:t}]=pe(),[o,{openDialog:l}]=pe(),[n,{openDialog:i}]=pe();return{register1:e,register2:o,register3:n,openDailog1:t,openDailog2:l,openDialogOne:function(){t({title:"新增",titleIcon:"el-icon-document-add",width:720,height:500,url:`/src/html/test.html?t=${+new Date}&id=123`,indata:{data:{type:"add",id:"100121210",infos:{name:"测试一下"}}},callback:function(e){}})},openDialogTwo:function(){l({loading:!1,title:"修改",showClose:!1,indata:{name:"zs",age:"28"}})},openDialogThree:function(){i()},testCancel:function(){},testSave:function(e){},testCpSave:function(){},testHandler:function(){}}}}));const be=y("测试IFrame模态窗"),me=y("测试Component模态窗"),ve=y("测试无参数模态窗"),Ce=y("Components组件"),ye=y("无参数模态窗"),we={class:"grid-content",ref:"gridContent"};he.render=function(e,t,o,l,n,i){const a=v("el-button"),s=v("BasicDialog"),c=v("DialogExtend"),d=v("el-col"),u=v("el-row");return f(),g(p,null,[r(a,{type:"primary",onClick:e.openDialogOne},{default:C((()=>[be])),_:1},8,["onClick"]),r(a,{type:"primary",onClick:e.openDialogTwo},{default:C((()=>[me])),_:1},8,["onClick"]),r(a,{type:"primary",onClick:e.openDialogThree},{default:C((()=>[ve])),_:1},8,["onClick"]),r(s,{onRegister:e.register1,onCancel:e.testCancel,onSave:e.testSave},null,8,["onRegister","onCancel","onSave"]),r(s,{onRegister:e.register2,onCancel:e.testCancel,onSave:e.testCpSave},{default:C((()=>[Ce])),_:1},8,["onRegister","onCancel","onSave"]),r(s,{onRegister:e.register3,onCancel:e.testCancel},{default:C((()=>[ye])),_:1},8,["onRegister","onCancel"]),r(u,null,{default:C((()=>[r(d,{span:24},{default:C((()=>[r("div",we,[r(c)],512)])),_:1})])),_:1})],64)}}}}));
