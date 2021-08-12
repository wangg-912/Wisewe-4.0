import{p as e,u as l,d as t,b as n,D as r,E as s,c as o,_ as i,F as a,S as c}from"./index.a5f36613.js";import{u}from"./useHeaderSetting.20d9e22f.js";import{_ as d}from"./index.aa249a6c.js";import{d as f,y as g,z as m,f as p,j as h,k as b,l as w,L as S,Z as C,B as y,A as x,C as v,c as k,u as F,b as T,a as E,M as _,a0 as $,V as I}from"./element-plus.3788f1c9.js";import{u as M}from"./useMenuSetting.32abff55.js";import{u as L}from"./useAppInject.4dff63d6.js";var B=f({name:"BreadCrumb",props:{theme:e.oneOf(["dark","light"])},components:{FontIcon:d},setup(){const{getShowBreadCrumbIcon:e}=t(),{currentRoute:n}=l();return{getShowBreadCrumbIcon:e,currentRoute:n}}});const z=v();g("data-v-61904132");const H={key:0},j={key:1,class:"bc-title"};m();const A=z(((e,l,t,n,r,s)=>{const o=p("font-icon"),i=p("el-breadcrumb-item"),a=p("el-breadcrumb");return h(),b("div",{class:["wisewe-layout-header-breadcrumb",`wisewe-layout-header-breadcrumb--${e.theme}`]},[w(a,null,{default:z((()=>[(h(!0),b(S,null,C(e.currentRoute.matched,((l,t)=>(h(),b(i,{key:t},{default:z((()=>[e.getShowBreadCrumbIcon?(h(),b("span",H,[w(o,{type:l.meta.icon,size:"14",closely:""},null,8,["type"])])):y("",!0),l.meta&&l.meta.title?(h(),b("span",j,x(l.meta.title),1)):y("",!0)])),_:2},1024)))),128))])),_:1})],2)}));B.render=A,B.__scopeId="data-v-61904132";var R=f({name:"LayoutTrigger",props:{theme:e.oneOf(["dark","light"])},setup(){const{prefixCls:e}=n("layout-header-trigger"),{getCollapsed:l,toggleCollapsed:t}=M();return{prefixCls:e,isCollapse:k((()=>F(l))),toggleCollapsed:t}}});const q=v()(((e,l,t,n,r,s)=>(h(),b("div",{class:[`${e.prefixCls}`,`${e.prefixCls}--${e.theme}`],collapse:e.isCollapse,onClick:l[1]||(l[1]=(...l)=>e.toggleCollapsed&&e.toggleCollapsed(...l))},[w("i",{class:["el-icon-s-fold",e.isCollapse?"el-icon--collapse":"el-icon--expend"]},null,2)],10,["collapse"]))));R.render=q,R.__scopeId="data-v-2fd0ead3";
/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
var O=T((function(e){var l,t,n,r,s;l="undefined"!=typeof window&&void 0!==window.document?window.document:{},t=e.exports,n=function(){for(var e,t=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n=0,r=t.length,s={};n<r;n++)if((e=t[n])&&e[1]in l){for(n=0;n<e.length;n++)s[t[0][n]]=e[n];return s}return!1}(),r={change:n.fullscreenchange,error:n.fullscreenerror},s={request:function(e,t){return new Promise(function(r,s){var o=function(){this.off("change",o),r()}.bind(this);this.on("change",o);var i=(e=e||l.documentElement)[n.requestFullscreen](t);i instanceof Promise&&i.then(o).catch(s)}.bind(this))},exit:function(){return new Promise(function(e,t){if(this.isFullscreen){var r=function(){this.off("change",r),e()}.bind(this);this.on("change",r);var s=l[n.exitFullscreen]();s instanceof Promise&&s.then(r).catch(t)}else e()}.bind(this))},toggle:function(e,l){return this.isFullscreen?this.exit():this.request(e,l)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,t){var n=r[e];n&&l.addEventListener(n,t,!1)},off:function(e,t){var n=r[e];n&&l.removeEventListener(n,t,!1)},raw:n},n?(Object.defineProperties(s,{isFullscreen:{get:function(){return Boolean(l[n.fullscreenElement])}},element:{enumerable:!0,get:function(){return l[n.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(l[n.fullscreenEnabled])}}}),t?e.exports=s:window.screenfull=s):t?e.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}})),P=f({name:"Screenfull",setup(){const{prefixCls:e}=n("screen-full"),l=E(!1),t=O;return _((()=>{t.isEnabled&&t.on("change",(()=>{l.value=t.isFullscreen}))})),{prefixCls:e,isFullscreen:l,click:function(){if(!t.isEnabled)return!1;t.toggle()}}}});P.render=function(e,l,t,n,r,s){return h(),b("span",{class:`${e.prefixCls}`,onClick:l[1]||(l[1]=(...l)=>e.click&&e.click(...l))},[w("i",{class:e.isFullscreen?"el-icon-crop":"el-icon-full-screen",size:"18"},null,2)],2)};var D=f({name:"LayoutHeader",props:{siderType:{type:String,dafault:""},fixed:{type:Boolean,default:!0}},components:{AppLogo:r,AppSearch:s,LayoutTrigger:R,BreadCrumb:B,Screenfull:P,SettingDrawer:o((()=>i((()=>__import__("./index.494cd004.js").then((function(e){return e.i}))),["./index.494cd004.js","./index.6cc50d5f.css","./index.a5f36613.js","./index.754a4fb7.css","./element-plus.3788f1c9.js","./useAttrs.3d5ffbca.js","./isEqual.bd391a24.js","./_baseIsEqual.945998d2.js","./isObject.356ba3ed.js","./useMenuSetting.32abff55.js","./useHeaderSetting.20d9e22f.js"])),{loading:!0}),LayoutSider:o((()=>i((()=>__import__("./index.0fe956be.js")),["./index.0fe956be.js","./index.707b3cd3.css","./index.a5f36613.js","./index.754a4fb7.css","./element-plus.3788f1c9.js","./useMenuSetting.32abff55.js","./useAppInject.4dff63d6.js","./index.aa249a6c.js","./index.e1a955c4.css"])))},setup(e){const l=E(null),{getShowSetting:r,getSettingPosition:s,getMobileTriggrState:o,toggleMobileTriggerState:i}=t(),{prefixCls:d}=n("layout-header"),{getHeaderTheme:f,getShowFullScreen:g,getShowNotice:m,getShowBread:p,getShowHeaderLogo:h,getShowHeader:b}=u(),w=k((()=>F(h))),S=k((()=>a.getUserInfoState)),{getIsMobile:C}=L(),y=k((()=>{const l=F(f);return[d,{[`${d}--fixed`]:e.fixed,[`${d}--${l}`]:l}]})),x=k((()=>F(f))),v=k((()=>{if(!F(r))return!1;const e=F(s);return e===c.AUTO?F(b):e===c.HEADER}));return{prefixCls:d,getHeaderClass:y,headerTheme:x,showHeadLogo:w,getShowBread:p,getShowNotice:m,getShowFullScreen:g,getShowHeader:b,getShowSettingButton:v,getIsMobile:C,getMobileTriggrState:o,tgMobileTrigger:function(){i(!o.value)},userInfo:S,handCommand:function(e){switch(e){case"modify":alert("修改密码");break;case"loginout":l.value.submit()}},loginOutForm:l}}});const N=v();g("data-v-1a350692");const V={key:2,style:{padding:"0 8px"}},U=w("i",{class:"el-icon-bell",size:"18"},null,-1),G={class:"el-dropdown-link drop--user--text",style:{"font-size":"12px"}},Z={key:0},J=w("i",{class:"el-icon-arrow-down el-icon--right"},null,-1),K=w("i",{class:"el-icon-edit"},null,-1),Q=I("修改密码 "),W=w("i",{class:"el-icon-switch-button"},null,-1),X=I("退出登录 ");m();const Y=N(((e,l,t,n,r,s)=>{const o=p("AppLogo"),i=p("LayoutTrigger"),a=p("BreadCrumb"),c=p("LayoutSider"),u=p("el-scrollbar"),d=p("AppSearch"),f=p("Screenfull"),g=p("el-badge"),m=p("el-avatar"),S=p("el-dropdown-item"),C=p("el-dropdown-menu"),v=p("el-dropdown"),k=p("SettingDrawer"),F=p("el-header");return e.getShowHeader?(h(),b(F,{key:0,class:e.getHeaderClass},{default:N((()=>[w("div",{class:`${e.prefixCls}-left`},[e.showHeadLogo||e.getIsMobile?(h(),b(o,{key:0,class:[`${e.prefixCls}-logo`,`${e.prefixCls}--${e.headerTheme}`],theme:e.headerTheme,siderType:e.siderType,showLogoTitle:!e.getIsMobile,isMobile:e.getIsMobile?"mobile":""},null,8,["class","theme","siderType","showLogoTitle","isMobile"])):y("",!0),"top-menu"===e.siderType||e.getIsMobile?y("",!0):(h(),b("div",{key:1,class:`${e.prefixCls}-left--bread`},[w(i,{theme:e.headerTheme},null,8,["theme"]),e.getShowBread?(h(),b(a,{key:0,theme:e.headerTheme},null,8,["theme"])):y("",!0)],2)),e.getIsMobile?(h(),b("div",V,[w("i",{class:"el-icon-s-fold",style:{"font-size":"16px"},onClick:l[1]||(l[1]=(...l)=>e.tgMobileTrigger&&e.tgMobileTrigger(...l))})])):y("",!0)],2),w("div",{class:`${e.prefixCls}-center`},[w(u,null,{default:N((()=>["top-menu"==`${e.siderType}`?(h(),b(c,{key:0,style:{"max-width":"1280px",display:"flex"},navMode:"top-menu"==e.siderType?"horizontal":"vertical",siderType:e.siderType},null,8,["navMode","siderType"])):y("",!0)])),_:1})],2),w("div",{class:[`${e.prefixCls}-right`,`${e.prefixCls}-right--${e.headerTheme}`]},[w("div",{class:`${e.prefixCls}-right--item`},[w(d)],2),e.getShowFullScreen&&!e.getIsMobile?(h(),b("div",{key:0,class:`${e.prefixCls}-right--item`},[w(f)],2)):y("",!0),e.getShowNotice?(h(),b("div",{key:1,class:`${e.prefixCls}-right--item`},[w(g,{type:"danger",value:200,max:99},{default:N((()=>[U])),_:1})],2)):y("",!0),w("div",{class:`${e.prefixCls}-right--item`},[w(m,{src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"})],2),w("div",{class:[`${e.prefixCls}-right--item`,`${e.prefixCls}-right--user`]},[w(v,{onCommand:e.handCommand},{dropdown:N((()=>[w(C,null,{default:N((()=>[w(S,{command:"modify"},{default:N((()=>[K,Q])),_:1}),w(S,{divided:"",command:"loginout"},{default:N((()=>[W,X])),_:1})])),_:1})])),default:N((()=>[w("span",G,[e.userInfo.name?(h(),b("span",Z,x(e.userInfo.name),1)):y("",!0),J])])),_:1},8,["onCommand"]),w("form",{ref:"loginOutForm",style:{dispaly:"none"},action:"/shiro-cas-logout",method:"GET",onSubmit:l[2]||(l[2]=$(((...l)=>e.submit&&e.submit(...l)),["prevent"]))},null,544)],2),e.getShowSettingButton&&!e.getIsMobile?(h(),b(k,{key:2,class:`${e.prefixCls}-right--item`},null,8,["class"])):y("",!0)],2)])),_:1},8,["class"])):y("",!0)}));D.render=Y,D.__scopeId="data-v-1a350692";export default D;