System.register(["./index-legacy.3c9d9e06.js","./animation-legacy.20980627.js","./element-plus-legacy.7e7b8f5e.js"],(function(a){"use strict";var t,l,e,r,n,i,u,o,s,c,d,p,V;return{setters:[function(a){t=a.j},function(a){l=a.r,e=a.c},function(a){r=a.d,n=a.r,i=a.M,u=a.c,o=a.w,s=a.P,c=a.u,d=a.j,p=a.k,V=a.A}],execute:function(){const m={startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:a=>a>=0},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:(a,t,l,e)=>l*(1-Math.pow(2,-10*a/e))*1024/1023+t}};a("_",r({name:"CountTo",props:m,emits:["mounted","callback"],setup(a,{emit:r}){const d=n({localStartVal:a.startVal,displayValue:y(a.startVal),printVal:null,paused:!1,localDuration:a.duration,startTime:null,timestamp:null,remaining:null,rAF:null});i((()=>{a.autoplay&&V(),r("mounted")}));const p=u((()=>a.startVal>a.endVal));function V(){const{startVal:t,duration:e}=a;d.localStartVal=t,d.startTime=null,d.localDuration=e,d.paused=!1,d.rAF=l(f)}function m(){d.startTime=null,d.localDuration=+d.remaining,d.localStartVal=+d.printVal,l(f)}function f(t){const{useEasing:e,easingFn:n,endVal:i}=a;d.startTime||(d.startTime=t),d.timestamp=t;const u=t-d.startTime;d.remaining=d.localDuration-u,e?c(p)?d.printVal=d.localStartVal-n(u,0,d.localStartVal-i,d.localDuration):d.printVal=n(u,d.localStartVal,i-d.localStartVal,d.localDuration):c(p)?d.printVal=d.localStartVal-(d.localStartVal-i)*(u/d.localDuration):d.printVal=d.localStartVal+(i-d.localStartVal)*(u/d.localDuration),c(p)?d.printVal=d.printVal<i?i:d.printVal:d.printVal=d.printVal>i?i:d.printVal,d.displayValue=y(d.printVal),u<d.localDuration?d.rAF=l(f):r("callback")}function y(l){const{decimals:e,decimal:r,separator:n,suffix:i,prefix:u}=a;l=Number(l).toFixed(e);const o=(l+="").split(".");let s=o[0];const c=o.length>1?r+o[1]:"",d=/(\d+)(\d{3})/;if(n&&!t(n))for(;d.test(s);)s=s.replace(d,"$1"+n+"$2");return u+s+c+i}return o([()=>a.startVal,()=>a.endVal],(()=>{a.autoplay&&V()})),{count:f,reset:function(){d.startTime=null,e(d.rAF),d.displayValue=y(a.startVal)},resume:m,start:V,pauseResume:function(){d.paused?(m(),d.paused=!1):(e(d.rAF),d.paused=!0)},displayValue:s(d,"displayValue")}}})).render=function(a,t,l,e,r,n){return d(),p("span",null,V(a.displayValue),1)}}}}));
