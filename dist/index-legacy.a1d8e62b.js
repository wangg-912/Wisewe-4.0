var __vite_style__=document.createElement("style");__vite_style__.innerHTML='@charset "UTF-8";[data-v-462a2afd]:root{--header-bg-color:#394664;--header-bg-hover-color:#273352;--header-active-menu-bg-color:#273352;--sider-dark-bg-color:#273352;--sider-dark-darken-bg-color:#273352;--sider-dark-lighten-1-bg-color:#273352;--sider-dark-lighten-2-bg-color:#273352}[data-v-462a2afd]:export{theme:#fff}',document.head.appendChild(__vite_style__),System.register(["./index-legacy.da563804.js","./index-legacy.7765162b.js","./element-plus-legacy.7e7b8f5e.js"],(function(e){"use strict";var t,a,l,n,i,o,c,r,s,d,u,v,h,b,f,m,p,_,g,T,y;return{setters:[function(e){t=e.b,a=e.u,l=e.r,n=e.O,i=e.P},function(e){o=e._},function(e){c=e.d,r=e.a,s=e.c,d=e.M,u=e.w,v=e.y,h=e.z,b=e.f,f=e.j,m=e.k,p=e.L,_=e.Z,g=e.l,T=e.A,y=e.C}],execute:function(){var x=e("default",c({name:"MixTabs",components:{FontIcon:o},setup(){const e=t("mix-sidebar"),{currentRoute:o,push:c}=a(),v=r(""),h=s((()=>l.routes)),b=s((()=>h.value.filter((e=>!e.meta?.hidden))));function f(){const e=o.value.fullPath.split("/"),t=n(b.value,(t=>"/"===t.path?"/home"==`/${e[1]}`:t.path===`/${e[1]}`));t>-1&&(v.value=`/${e[1]}`,m(t),l.setAcitveTab(v.value))}function m(e){const t=b.value[e];l.setMenuTabRouters(t.children)}return d((()=>{f()})),u((()=>o.value),(()=>{f()})),u((()=>v.value),(e=>{l.setAcitveTab(e)})),{prefixCls:e,activeName:v,tabRoutes:b,filterTab:function(e,t){return e.meta&&e.meta[t]?e.meta[t]:e.children[0].meta[t]},setActive:m,changeTab:function(e){const t=b.value[e.index];l.setMenuTabRouters(t.children),i(t.children[0].path)?window.open(t.children[0].path):(c(`${"/home"===v.value?"":v.value}/${t.children[0].path}`),l.setAcitveTab(v.value))}}}}));const k=y();v("data-v-462a2afd");const C={class:"label-item"},$={style:{height:"30px"}},A={class:"title-item"};h();const M=k(((e,t,a,l,n,i)=>{const o=b("FontIcon"),c=b("el-tab-pane"),r=b("el-tabs");return f(),m(r,{class:`${e.prefixCls}`,modelValue:e.activeName,"onUpdate:modelValue":t[1]||(t[1]=t=>e.activeName=t),"tab-position":"left",onTabClick:e.changeTab},{default:k((()=>[(f(!0),m(p,null,_(e.tabRoutes,((t,a)=>(f(),m(c,{key:a,name:"/"===t.path?"/home":t.path},{label:k((()=>[g("div",C,[g("div",$,[g(o,{type:e.filterTab(t,"icon"),size:20},null,8,["type"])]),g("div",A,T(e.filterTab(t,"title")),1)])])),_:2},1032,["name"])))),128))])),_:1},8,["class","modelValue","onTabClick"])}));x.render=M,x.__scopeId="data-v-462a2afd"}}}));
