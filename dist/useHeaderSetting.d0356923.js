import{f as e,h as t,d as o}from"./index.e5e251bd.js";import{u as r}from"./useMenuSetting.6168eab9.js";import{c as g,u as a}from"./element-plus.3788f1c9.js";const{getMenuMode:S,getSplit:h,getIsSidebarType:s,getShowHeaderTrigger:i,getIsTopMenu:n}=r(),{getShowBreadCrumb:d,getShowLogo:u}=o(),w=g((()=>e.getProjectConfig.headerSetting)),c=g((()=>a(w).theme)),m=g((()=>a(w).show)),f=g((()=>a(w).fixed)),l=g((()=>a(w).bgColor)),T=g((()=>a(w).showSearch)),p=g((()=>a(w).showFullScreen)),H=g((()=>a(w).showNotice)),C=g((()=>a(S)!==t.HORIZONTAL&&a(d)&&!a(h))),M=g((()=>a(u)&&!a(s)));function b(t){e.COMMITPROJECTCONFIGSTATE({headerSetting:t})}function I(){return{setHeaderSetting:b,getHeaderSetting:w,getShowSearch:T,getHeaderTheme:c,getShowFullScreen:p,getShowNotice:H,getShowBread:C,getShowHeaderLogo:M,getShowHeader:m,getFixed:f,getHeaderBgColor:l}}export{I as u};