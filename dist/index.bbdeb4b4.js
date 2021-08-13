import{I as e,b as a,J as t,K as s,L as n,d as o,e as i,N as l}from"./index.7442e940.js";import{d,c as g,y as r,z as c,j as p,k as u,B as m,C as f,a3 as y,u as b,f as C,l as v,T as L,K as j,q as x,v as h}from"./element-plus.3788f1c9.js";import{_ as k}from"./index.b22cf261.js";import"./useHeaderSetting.d37d93bb.js";import"./useMenuSetting.c7217c66.js";import"./404.1ffd17ad.js";import"./useAppInject.f6d1fa06.js";import"./uniqBy.f7365b6a.js";import"./_baseIsEqual.945998d2.js";import"./isObject.356ba3ed.js";import"./_baseGet.b63eb0f5.js";import"./isSymbol.69d4e912.js";var _=d({name:"Loading",props:{text:{type:String,default:"加载中..."},absolute:{type:Boolean,default:!1},customClass:{type:String,default:""},spinner:{type:String,default:"el-icon-loading"},loading:{type:Boolean,default:!1},lock:{type:Boolean,default:!1},background:{type:String},theme:{type:String,default:"light"}},setup:a=>({getStyle:g((()=>{const{background:t,theme:s}=a;return{background:t||(s===e.DARK?"rgba(0, 0, 0, 0.2)":"rgba(240, 242, 245, 0.4)")}}))})});const T=f();r("data-v-63a2516c");const S=y('<div class="el-loading-spinner loading-spin" data-v-63a2516c><span class="loading-spin-dot loading-spin-dot-spin" data-v-63a2516c><i class="loading-spin-dot-item" data-v-63a2516c></i><i class="loading-spin-dot-item" data-v-63a2516c></i><i class="loading-spin-dot-item" data-v-63a2516c></i><i class="loading-spin-dot-item" data-v-63a2516c></i></span><div class="loading-spin-text" data-v-63a2516c>智汇校园管理系统</div></div>',1);c();const P=T(((e,a,t,s,n,o)=>e.loading?(p(),u("section",{key:0,class:["full-loading",e.absolute],style:e.getStyle,lock:e.lock,text:e.text,customClass:e.customClass,spinner:e.spinner},[S],14,["lock","text","customClass","spinner"])):m("",!0)));_.render=P,_.__scopeId="data-v-63a2516c";var B=d({name:"PageLayout",components:{FramePanel:k},setup(){const{prefixCls:e}=a("layout-wrapper"),{getOpenKeepAlive:d}=o(),{getTagsShow:r}=i(),{getCaches:c}=t(!1),{getBasicTransition:p,getEnableTransition:u}=l(),m=g((()=>b(d)&&b(r)));return{prefixCls:e,getKey:s,getOpenKeepAlive:d,getTransitionName:n,openCache:m,getEnableTransition:u,getBasicTransition:p,getCaches:c}}});const K=f(),I=K(((e,a,t,s,n,o)=>{const i=C("router-view");return p(),u("div",{class:e.prefixCls},[v(i,null,{default:K((({Component:a,route:t})=>[v(L,{name:e.getTransitionName({route:t,openCache:e.openCache,enableTransition:e.getEnableTransition,cacheTabs:e.getCaches,def:e.getBasicTransition}),mode:"out-in",appear:""},{default:K((()=>[e.openCache?(p(),u(j,{key:0,include:e.getCaches},[(p(),u(x(a),e.getKey(a,t),null,16))],1032,["include"])):(p(),u(x(a),h({key:1},e.getKey(a,t)),null,16))])),_:2},1032,["name"])])),_:1})],2)}));B.render=I,B.__scopeId="data-v-4ae61ed4";var O=d({name:"LayoutContent",components:{PageLayout:B,Loading:_},setup(){const{prefixCls:e}=a("layout-container"),{getOpenPageLoading:t}=l(),{getLayoutContentMode:s,getPageLoading:n}=o();return{prefixCls:e,getOpenPageLoading:t,getLayoutContentMode:s,getPageLoading:n}}});const A=f(),E=A(((e,a,t,s,n,o)=>{const i=C("Loading"),l=C("PageLayout"),d=C("el-main");return p(),u(d,{class:[e.prefixCls,e.getLayoutContentMode]},{default:A((()=>[v(L,null,{default:A((()=>[e.getOpenPageLoading?(p(),u(i,{key:0,loading:e.getPageLoading,background:"rgba(240, 242, 245, 0.6)",absolute:"",class:`${e.prefixCls}-loading`},null,8,["loading","class"])):m("",!0)])),_:1}),v(l)])),_:1},8,["class"])}));O.render=E,O.__scopeId="data-v-0d81b35d";export default O;