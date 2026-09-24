const CACHE='ledger-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','styles.css','app.js','config.js','manifest.webmanifest','icon.svg']))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request))));
