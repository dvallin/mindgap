if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const c={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return c;default:return e(r)}})).then(e=>{const r=n(...e);return i.default||(i.default=r),i})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"img/brain.png",revision:"51b5d94cf9697ffacfa81afc7337c8d8"},{url:"img/brain.svg",revision:"014560c03cbcab7f1adee1b2824cc5d6"},{url:"img/brain_s.png",revision:"7dfd8a5630015eb0f7427380999655d3"},{url:"index.html",revision:"cf12dc10a02255797c324d544ac117f4"},{url:"main.js",revision:"999732cf0692b83738553ff2698b7c0d"},{url:"manifest.webmanifest",revision:"7cc8f246ee5a992f9aa535271136ea68"},{url:"vendor.js",revision:"193f985e75bb987723c6fa56b1a12801"}],{})}));
