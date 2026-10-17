// Guarda la app para que abra aunque no haya internet; los datos van aparte, en el teléfono y en su hoja
const CACHE = 'nuestra-boda-v1';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './icono.png']))); self.skipWaiting(); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (new URL(e.request.url).origin !== location.origin || e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))));
});
