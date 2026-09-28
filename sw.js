// Roamize service worker — caches the app shell so it opens fast (and mostly offline).
// Bump CACHE whenever index.html changes, or phones keep the old build.
const CACHE = 'roamize-v11';
const SHELL = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];
// live data: never cached, always straight to the network
const LIVE_HOSTS = [
  'api.anthropic.com', 'open-meteo.com', 'api.github.com', 'gist.githubusercontent.com',
  'api.weather.gov', 'services3.arcgis.com', 'router.project-osrm.org', 'r.jina.ai',
  'flickr.com', 'googleapis.com', 'wikimedia.org'
];
const isLive = url => LIVE_HOSTS.some(h => url.hostname.includes(h));

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    // Safari 27 / Chrome: Service Worker Static Routing. Lets the browser skip this
    // worker entirely for live-data hosts, so Scout and the weather calls start faster.
    // Older browsers ignore it (the fetch handler below does the same job).
    if (e.addRoutes) {
      try {
        await e.addRoutes(LIVE_HOSTS.map(h => ({ condition: { urlPattern: { hostname: '*' + h } }, source: 'network' })));
      } catch (err) { /* unsupported pattern syntax on some builds — the fetch handler covers it */ }
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (isLive(url)) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && (url.origin === location.origin || url.hostname.includes('basemaps.cartocdn.com') || url.hostname.includes('arcgisonline.com'))) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
