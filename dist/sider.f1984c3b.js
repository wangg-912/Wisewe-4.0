import{c as e,_ as t,d as s}from"./index.e5e251bd.js";import{u as r}from"./useAppInject.1f7b2626.js";import{d as o,f as l,j as i,k as a,m as d,l as n,B as u,L as p}from"./element-plus.3788f1c9.js";var g=o({name:"Sider",components:{LayoutSider:e((()=>t((()=>import("./index.faad9cf2.js")),["./index.faad9cf2.js","./index.707b3cd3.css","./index.e5e251bd.js","./index.754a4fb7.css","./element-plus.3788f1c9.js","./useMenuSetting.6168eab9.js","./useAppInject.1f7b2626.js","./index.6b327c28.js","./index.e1a955c4.css"])))},props:{siderType:{type:String,default:"sidebar"}},setup(){const{getMobileTriggrState:e,toggleMobileTriggerState:t}=s(),{getIsMobile:o}=r();return{getIsMobile:o,getMobileTriggrState:e,handleClose:function(){t(!e.value)}}}});const m={class:"mobile-menu-content"};g.render=function(e,t,s,r,o,g){const c=l("LayoutSider"),b=l("el-drawer");return i(),a(p,null,[e.getIsMobile?(i(),a(b,{key:0,modelValue:e.getMobileTriggrState,"onUpdate:modelValue":t[1]||(t[1]=t=>e.getMobileTriggrState=t),direction:"ltr","custom-class":"mobile-menu-drawer",size:"240px","show-close":!1,"before-close":e.handleClose},{title:d((()=>[])),default:d((()=>[n("div",m,[n(c,{siderType:e.siderType},null,8,["siderType"])])])),_:1},8,["modelValue","before-close"])):u("",!0),e.getIsMobile?u("",!0):(i(),a(c,{key:1,siderType:e.siderType},null,8,["siderType"]))],64)};export default g;
