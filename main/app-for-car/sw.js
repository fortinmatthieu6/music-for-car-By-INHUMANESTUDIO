const C='musique-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(k=>k.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.open(C).then(async k=>{const m=await k.match(e.request,{ignoreSearch:true});
const f=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')k.put(e.request,r.clone());return r}).catch(()=>m||k.match('./index.html'));
return m||f}))});
