var __vite_style__=document.createElement("style");__vite_style__.innerHTML='@charset "UTF-8";[data-v-0be5f089]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-0be5f089]:export{theme:#fff}.wisewe-setting-switch[data-v-0be5f089]{display:flex;justify-content:space-between;margin:16px 0;padding:0 12px}.wisewe-setting-switch-label[data-v-0be5f089]{font-size:14px;color:#333}',document.head.appendChild(__vite_style__),System.register(["./index-legacy.da563804.js","./index-legacy.f421fe11.js","./element-plus-legacy.7e7b8f5e.js","./useAttrs-legacy.6062cc02.js","./isEqual-legacy.674c912f.js","./_baseIsEqual-legacy.c646f212.js","./isObject-legacy.2ad11661.js","./useMenuSetting-legacy.31a3a429.js","./useHeaderSetting-legacy.2b5538da.js"],(function(e){"use strict";var t,a,n,l,s,i,c,d,o,r;return{setters:[function(e){t=e.b},function(e){a=e.b},function(e){n=e.d,l=e.c,s=e.f,i=e.j,c=e.k,d=e.l,o=e.A,r=e.C},function(){},function(){},function(){},function(){},function(){},function(){}],execute:function(){var u=e("default",n({name:"SwitchItem",props:{event:{type:Number,default:()=>{}},disabled:{type:Boolean,default:!1},title:{type:String},def:{type:Boolean}},setup(e){const{prefixCls:n}=t("setting-switch");return{prefixCls:n,getValue:l((()=>e.def||!1)),handleChange:function(t){e.event&&a(e.event,t)}}}}));const f=r()(((e,t,a,n,l,r)=>{const u=s("el-switch");return i(),c("div",{class:`${e.prefixCls}`},[d("span",{class:`${e.prefixCls}-label`},o(e.title),3),d(u,{modelValue:e.getValue,"onUpdate:modelValue":t[1]||(t[1]=t=>e.getValue=t),disabled:e.disabled,onChange:e.handleChange},null,8,["modelValue","disabled","onChange"])],2)}));u.render=f,u.__scopeId="data-v-0be5f089"}}}));
