import{s,r as t,Q as e,g as c}from"./element-plus.3788f1c9.js";const r=["class","style"],a=/^on[A-Z]/;function n(n={}){const o=c();if(!o)return{};const{excludeListeners:u=!1,excludeKeys:l=[]}=n,i=s({}),d=l.concat(r);return o.attrs=t(o.attrs),e((()=>{const s=(t=o.attrs,Object.keys(t).map((s=>[s,t[s]]))).reduce(((s,[t,e])=>(d.includes(t)||u&&a.test(t)||(s[t]=e),s)),{});var t;i.value=s})),i}export{n as u};