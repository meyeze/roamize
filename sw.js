// Roamize service worker — caches the app shell so it opens fast (and mostly offline).
const CACHE = 'roamize-v9';
const SHELL = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // never cache API, weather, alert, fire-map, routing, feed, or sync calls — live data stays live
  if (url.hostname.includes('api.anthropic.com') || url.hostname.includes('open-meteo.com') || url.hostname.includes('api.github.com') || url.hostname.includes('gist.githubusercontent.com') || url.hostname.includes('api.weather.gov') || url.hostname.includes('services3.arcgis.com') || url.hostname.includes('router.project-osrm.org') || url.hostname.includes('r.jina.ai') || url.hostname.includes('flickr.com') || url.hostname.includes('googleapis.com') || url.hostname.includes('wikimedia.org')) return;
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
