System.register(["./index-legacy.da563804.js","./element-plus-legacy.7e7b8f5e.js"],(function(e){"use strict";var t,n,g,o,i,u;return{setters:[function(e){t=e.f,n=e.M,g=e.h,o=e.T},function(e){i=e.c,u=e.u}],execute:function(){e("u",(function(){return{setMenuSetting:R,toggleCollapsed:y,getShowMenu:m,getMenuBgColor:r,getMenuFixed:s,getCollapsed:M,getShowLogoTitle:d,getMenuWidth:T,getMenuType:c,getMenuTheme:a,getMenuMode:h,getTopMenuAlign:S,getTrigger:I,getShowTopMenu:C,getShowHeaderTrigger:E,getIsSidebarType:p,getIsHorizontal:O,getIsMixSidebar:w}}));const l=i((()=>t.getProjectConfig.menuSetting)),r=i((()=>u(l).bgColor)),s=i((()=>u(l).fixed)),M=i((()=>u(l).collapsed)),d=i((()=>u(l).showLogoTitle)),T=i((()=>u(l).menuWidth)),c=i((()=>u(l).type)),a=i((()=>u(l).theme)),h=i((()=>u(l).mode)),S=i((()=>u(l).topMenuAlign)),p=i((()=>u(c)===n.SIDEBAR||u(c)===n.MIX_SIDEBAR)),I=i((()=>u(l).trigger)),f=i((()=>u(l).split)),m=i((()=>u(l).show)),A=i((()=>u(l).hidden)),C=i((()=>u(h)===g.HORIZONTAL||u(f))),E=i((()=>!(u(c)===n.TOP_MENU||!u(m)||u(A))&&u(I)===o.HEADER)),O=i((()=>u(h)===g.HORIZONTAL)),w=i((()=>u(c)===n.MIX_SIDEBAR));function R(e){t.COMMITPROJECTCONFIGSTATE({menuSetting:e})}function y(){R({collapsed:!u(M),menuWidth:M.value?240:56,showLogoTitle:!!M.value})}}}}));