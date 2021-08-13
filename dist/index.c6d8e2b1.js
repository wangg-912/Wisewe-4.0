var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,a=Object.prototype.propertyIsEnumerable,l=(t,s,a)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a,n=(e,n)=>{for(var i in n||(n={}))t.call(n,i)&&l(e,i,n[i]);if(s)for(var i of s(n))a.call(n,i)&&l(e,i,n[i]);return e};import{p as i,b as o,r,P as p,C as u,D as m,u as d,d as c,B as h}from"./index.7442e940.js";import{u as f}from"./useMenuSetting.c7217c66.js";import{u as y}from"./useAppInject.f6d1fa06.js";import{_ as b}from"./index.2b3ccb57.js";import{d as g,f as $,j as T,k as v,m as x,l as C,A as w,B as M,a as I,c as S,u as L,L as P,Z as j,C as O}from"./element-plus.3788f1c9.js";var k=g({name:"MenuItem",props:{item:{type:Object,default:()=>{}},color:{type:String,default:""},vpath:{type:String,default:""}},components:{FontIcon:b},setup:e=>({iPath:e.vpath,iName:e.item.name,iIcon:e.item.meta&&e.item.meta.icon,iTitle:e.item.meta&&e.item.meta.title})});k.render=function(e,t,s,a,l,n){const i=$("font-icon"),o=$("el-menu-item");return e.iName?(T(),v(o,{key:0,index:e.iPath},{title:x((()=>[C("span",null,w(e.iTitle),1)])),default:x((()=>[e.iIcon?(T(),v(i,{key:0,type:e.iIcon,style:{"padding-right":"2px"},color:e.color},null,8,["type","color"])):M("",!0)])),_:1},8,["index"])):M("",!0)};var _=g({name:"MenuItems",props:{theme:i.oneOf(["dark","light"]),menu:{type:Object,default:()=>{}},siderType:{type:String,default:"sidebar"},basePath:{type:String,default:""}},components:{MenuItem:k,FontIcon:b},setup(e){const t=I(null),{prefixCls:s}=o("sider-menu"),{getCollapsed:a}=f(),{basePath:l,siderType:i}=e,m=S((()=>L(a)?"collapse":"expend")),d=S((()=>r.activeTag)),c=S((()=>"mix-sidebar"===i));return{prefixCls:s,collapse:m,onlyOneChild:t,hasOneShowingChild:function(e=[],s){return 0===e.filter((e=>(!e.meta||!e.meta.hidden)&&(t.value=e,!0))).length&&(t.value=n(n({},s),{path:"",noShowingChildren:!0}),!0)},resolvePath:function(e,t){return p(e)?e:t?u.resolve(t||l,e):u.resolve(l,e)},activeTab:d,showMenuTab:c}}});const A=O(),R=A(((e,t,s,a,l,n)=>{var i,o,r;const p=$("font-icon"),u=$("MenuItems"),m=$("el-submenu"),d=$("MenuItem");return e.menu.children&&e.menu.children.length&&!(null==(i=e.menu.meta)?void 0:i.hidden)?(T(),v(m,{key:0,index:e.resolvePath(e.menu.path,e.showMenuTab?`${e.activeTab}/${e.basePath}`:""),class:[`${e.prefixCls}--${e.theme}`,"top-menu"!=`${e.siderType}`&&`${e.prefixCls}--${e.theme}-${e.collapse}`,`${e.prefixCls}--${e.siderType}`]},{title:A((()=>[e.menu.meta.icon?(T(),v(p,{key:0,type:e.menu.meta.icon,style:{"padding-right":"2px"},class:["top-menu"!=`${e.siderType}`&&`${e.prefixCls}--${e.theme}-${e.collapse}-icon`,`${e.prefixCls}--${e.siderType}-icon`],color:"top-menu"!=`${e.siderType}`?"collapse"==`${e.collapse}`?"#ffffff":"":"#333333"},null,8,["type","class","color"])):M("",!0),e.menu.meta&&e.menu.meta.title?(T(),v("span",{key:1,class:`${e.prefixCls}--${e.theme}_sub-title`},w(e.menu.meta.title),3)):M("",!0)])),default:A((()=>[(T(!0),v(P,null,j(e.menu.children,(t=>(T(),v(u,{key:t.name,menu:t,theme:e.theme,siderType:e.siderType,"base-path":e.resolvePath(t.path)},null,8,["menu","theme","siderType","base-path"])))),128))])),_:1},8,["index","class"])):e.hasOneShowingChild(e.menu.children,e.menu)&&!(null==(o=e.menu.meta)?void 0:o.hidden)?(T(),v(P,{key:1},[(null==(r=e.menu.meta)?void 0:r.hidden)?M("",!0):(T(),v(d,{key:0,vpath:e.resolvePath(e.onlyOneChild.path,e.showMenuTab?`${e.activeTab}/${e.basePath}`:""),item:e.menu,class:[`${e.prefixCls}--${e.theme}-item`,"top-menu"!=`${e.siderType}`&&`${e.prefixCls}--${e.theme}-${e.collapse}-icon`,`${e.prefixCls}--${e.siderType}-icon`],color:"collapse"==`${e.collapse}`?"#ffffff":""},null,8,["vpath","item","class","color"]))],64)):M("",!0)}));_.render=R,_.__scopeId="data-v-3b2f1d6d";var W=g({name:"LayoutSider",components:{AppLogo:m,MenuItems:_},props:{navMode:{type:String,default:"vertical"},siderType:{type:String,default:"sidebar"}},setup(e){const t=h(),{getShowLogo:s}=c(),{getMenuWidth:a,getCollapsed:l,getShowLogoTitle:n,getMenuTheme:i,getMenuType:u}=f(),{getIsMobile:m}=y(),{currentRoute:b}=d(),g=S((()=>L(l))),$=S((()=>{const{matched:e,path:t}=b.value;return t})),T=S((()=>"top-menu"==e.siderType?"auto":L(a))),v=S((()=>L(n))),x=S((()=>L(s)&&("sidebar"===L(u)||"mix-sidebar"===L(u)))),{prefixCls:C}=o("layout-sider"),w=S((()=>r.getRoutes)),M=S((()=>"mix-sidebar"===e.siderType)),I=S((()=>r.menuTabRouters));return{isCollapse:g,getIsMobile:m,logoTitle:v,activeMenu:$,menusWidth:T,showLogo:x,prefixCls:C,theme:S((()=>L(i))),getMenuType:u,menuLists:w,menuHandle:function(e){b.value.fullPath!==e&&(p(e)?window.open(e):t(e))},showMenuTab:M,menuTabLists:I}}});const B=O(),F=B(((e,t,s,a,l,n)=>{const i=$("AppLogo"),o=$("menu-items"),r=$("el-menu"),p=$("el-scrollbar"),u=$("el-aside");return T(),v("div",{class:e.prefixCls},[C(u,{class:[`${e.prefixCls}-wrapper`,`${e.prefixCls}--${e.theme}`,`${e.prefixCls}--${e.siderType}`],width:`${e.menusWidth}px`},{default:B((()=>[e.showLogo&&!e.getIsMobile?(T(),v(i,{key:0,showLogoTitle:e.logoTitle,theme:e.theme},null,8,["showLogoTitle","theme"])):M("",!0),C(p,{"wrap-class":"scrollbar-wrapper",style:{height:e.getIsMobile?"100%":e.showLogo?"calc(100% - 50px)":"100%"}},{default:B((()=>[C(r,{mode:e.navMode,collapse:e.isCollapse,"unique-opened":!1,"default-active":e.activeMenu,class:[`${e.prefixCls}-aside`,`${e.prefixCls}-aside--${e.theme}`,`${e.prefixCls}-aside-${e.isCollapse?"collapse":"expend"}`,`${e.prefixCls}-aside--${e.siderType}`],"collapse-transition":!1,onSelect:e.menuHandle},{default:B((()=>[(T(!0),v(P,null,j(e.showMenuTab?e.menuTabLists:e.menuLists,(t=>(T(),v(o,{key:t.name,menu:t,theme:e.theme,siderType:e.siderType,"base-path":t.path},null,8,["menu","theme","siderType","base-path"])))),128))])),_:1},8,["mode","collapse","default-active","class","onSelect"])])),_:1},8,["style"])])),_:1},8,["class","width"])],2)}));W.render=F,W.__scopeId="data-v-394440d9";export default W;
