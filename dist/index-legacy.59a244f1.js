var __vite_style__=document.createElement("style");__vite_style__.innerHTML='@charset "UTF-8";[data-v-04d315b7]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-04d315b7]:export{theme:#fff}.wisewe-iframe-page[data-v-04d315b7]{height:inherit}.wisewe-iframe-page--main[data-v-04d315b7]{border:0;width:100%;height:100%;overflow:auto}.wisewe-iframe-page--main>body[data-v-04d315b7]{margin:0;padding:0}[data-v-5c7950c8]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-5c7950c8]:export{theme:#fff}',document.head.appendChild(__vite_style__),System.register(["./index-legacy.3c9d9e06.js","./useHeaderSetting-legacy.ce8d6d41.js","./404-legacy.536be61b.js","./element-plus-legacy.7e7b8f5e.js","./uniqBy-legacy.74d94a2c.js"],(function(e){"use strict";var r,a,t,n,o,s,c,i,d,l,m,u,g,f,h,p,b,v,w,y,_,F,S;return{setters:[function(e){r=e.b,a=e.e,t=e.G,n=e.H},function(e){o=e.u},function(e){s=e.default},function(e){c=e.d,i=e.a,d=e.c,l=e.u,m=e.M,u=e.n,g=e.f,f=e.j,h=e.k,p=e.C,b=e.t,v=e.L,w=e.Z,y=e.X,_=e.a1,F=e.B},function(e){S=e.u}],execute:function(){var k=c({name:"FrameView",props:{frameSrc:{type:String,default:""}},components:{pageNofind:s},setup(){const e=i(window.innerHeight),t=i(null),n=i(!0),{prefixCls:s}=r("iframe-page"),{getShowHeader:c}=o(),{getTagsShow:g}=a(),f=d((()=>l(c)?56:0)),h=d((()=>l(g)?37:0)),p=d((()=>({height:l(e)-f.value-h.value-8+"px"})));return m((()=>{u((()=>{const e=l(t);if(!e)return;const r=e;e.onload=()=>{const{contentWindow:e}=r;e.document.body&&!e.document.body.innerHTML&&(n.value=!1)}}))})),{prefixCls:s,getWrapStyle:p,frameRef:t,visibility:n}}});const x=p()(((e,r,a,t,n,o)=>{const s=g("page-nofind");return f(),h("div",{class:e.prefixCls,style:e.getWrapStyle},[e.visibility?(f(),h("iframe",{key:0,src:e.frameSrc,class:`${e.prefixCls}--main`,ref:"frameRef"},null,10,["src"])):(f(),h(s,{key:1}))],6)}));k.render=x,k.__scopeId="data-v-04d315b7";var R=e("_",c({name:"FramePanel",components:{FrameView:k},setup(){const{prefixCls:e}=r("frame-wrapper"),{getFramePages:o,hasRenderFrame:s,showIframe:c}=function(){const{currentRoute:e}=t,{getTagsShow:r}=a(),o=d((()=>c(b(t.getRoutes()))||[])),s=d((()=>n.getTagsState.reduce(((e,r)=>(r.meta&&Reflect.has(r.meta,"frameSrc")&&e.push(r.name),e)),[])));function c(e){let r=[];for(const a of e){const{meta:{frameSrc:e}={},children:t}=a;e&&r.push(a),t&&t.length&&r.push(...c(t))}return r=S(r,"name"),r}return{hasRenderFrame:function(e){return l(r)?l(s).includes(e):t.currentRoute.value.name===e},getFramePages:o,showIframe:function(r){return r.name===l(e).name},getAllFramePages:c}}(),i=d((()=>l(o).length>0));return{prefixCls:e,getFramePages:o,hasRenderFrame:s,showIframe:c,showFrame:i,resetFrameURL:function(e){return e.includes("?")?`${e}&t=${+new Date}`:`${e}?t=${+new Date}`}}}}));const C=p()(((e,r,a,t,n,o)=>{const s=g("FrameView");return e.showFrame?(f(),h("div",{key:0,class:e.prefixCls},[(f(!0),h(v,null,w(e.getFramePages,(r=>(f(),h(v,{key:r.path},[r.meta.frameSrc&&e.hasRenderFrame(r.name)?y((f(),h(s,{key:0,frameSrc:e.resetFrameURL(r.meta.frameSrc)},null,8,["frameSrc"])),[[_,e.showIframe(r)]]):F("",!0)],64)))),128))],2)):F("",!0)}));R.render=C,R.__scopeId="data-v-5c7950c8"}}}));
