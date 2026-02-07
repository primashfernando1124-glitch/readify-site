// Simple PWA cache (works on GitHub Pages)
// NOTE: We only cache local files. Remote images/audio are NOT cached.

const CACHE_NAME = "readify-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./explorer.html",
  "./tracker.html",
  "./recommender.html",
  "./flow.html",
  "./feedback.html",
  "./css/styles.css",
  "./js/utils.js",
  "./js/data.js",
  "./js/home.js",
  "./js/explorer.js",
  "./js/tracker.js",
  "./js/recommender.js",
  "./js/flow.js",
  "./js/feedback.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req).then(res => {
        // Cache only same-origin GET requests (avoid cross-origin caching issues)
        const url = new URL(req.url);
        if (req.method === "GET" && url.origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => cached);
    })
  );
});