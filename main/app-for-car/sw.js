const C='musique-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(k=>k.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
if(e.request.method!=='GET'||(u.origin!==location.origin&&!/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname)))return;
e.respondWith(caches.open(C).then(async k=>{const m=await k.match(e.request,{ignoreSearch:true});
const f=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')k.put(e.request,r.clone());return r}).catch(()=>m||k.match('./index.html'));
return m||f}))});
