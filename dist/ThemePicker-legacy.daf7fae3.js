var __vite_style__=document.createElement("style");__vite_style__.innerHTML='@charset "UTF-8";[data-v-27af6d67]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-27af6d67]:export{theme:#fff}.wisewe-setting-theme-picker[data-v-27af6d67]{display:flex;flex-wrap:wrap;flex:1;margin:16px 0;justify-content:space-around}.wisewe-setting-theme-picker__box[data-v-27af6d67]{width:24px;height:24px;border:1px solid #ddd;border-radius:4px;cursor:pointer}.wisewe-setting-theme-picker__item[data-v-27af6d67]{width:18px;height:18px;display:flex;margin:3px;border-radius:2px;align-items:center;justify-content:center}',document.head.appendChild(__vite_style__),System.register(["./index-legacy.da563804.js","./index-legacy.f421fe11.js","./element-plus-legacy.7e7b8f5e.js","./useAttrs-legacy.6062cc02.js","./isEqual-legacy.674c912f.js","./_baseIsEqual-legacy.c646f212.js","./isObject-legacy.2ad11661.js","./useMenuSetting-legacy.31a3a429.js","./useHeaderSetting-legacy.2b5538da.js"],(function(e){"use strict";var t,r,i,a,n,s,c,l,o,d,f;return{setters:[function(e){t=e.b,r=e.a0},function(e){i=e.b},function(e){a=e.d,n=e.j,s=e.k,c=e.L,l=e.Z,o=e.l,d=e.B,f=e.C},function(){},function(){},function(){},function(){},function(){},function(){}],execute:function(){var u=e("default",a({name:"ThemePicker",props:{colorList:{type:Array,defualt:[]},event:{type:Number,default:()=>{}},def:{type:String}},setup(e){const{prefixCls:a}=t("setting-theme-picker");return{prefixCls:a,handleClick:function(t){e.event&&i(e.event,t)},transformColor:function(e){return r(e)}}}}));const p=f()(((e,t,r,i,a,f)=>(n(),s("div",{class:e.prefixCls},[(n(!0),s(c,null,l(e.colorList||[],(t=>(n(),s("span",{key:t,class:[`${e.prefixCls}__box`]},[o("span",{onClick:r=>e.handleClick(t),class:[`${e.prefixCls}__item`,{[`${e.prefixCls}__item--active`]:e.def===t}],style:{background:t}},[e.def===t?(n(),s("i",{key:0,class:"el-icon-check",style:[{fontsize:"14px"},{color:e.transformColor(t)}]},null,4)):d("",!0)],14,["onClick"])],2)))),128))],2))));u.render=p,u.__scopeId="data-v-27af6d67"}}}));
