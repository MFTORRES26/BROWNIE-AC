const CACHE='brownie-ac-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./logo.png','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const u=new URL(e.request.url);if(r.ok&&(u.origin===location.origin||u.host.includes('fonts.g'))){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r})
  .catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))))});
