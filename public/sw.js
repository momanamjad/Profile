const CACHE_NAME = 'portfolio-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/styles/style.css',
  '/src/main.js',
  // Essential textures only
  '/assets/images/sun.webp',
  '/assets/images/moon.webp',
  './assets/images/me.png',
  // Optimized 4KB Font
  '/assets/fonts/font.json',
  // Iframe shell
  '/iframes/index.html',
  '/iframes/styles.css',
  '/iframes/script.js',
];

// Install: pre-cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn(`SW: Skipping ${url}`, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first for assets, Network-first for HTML/API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and cross-origin API calls (GitHub API, etc.)
  if (event.request.method !== 'GET') return;
  if (url.hostname !== self.location.hostname) {
    // For external resources, use network-first with cache fallback (except GitHub API)
    if (url.hostname.includes('github.com') || url.hostname.includes('googleapis.com')) {
      return; // Let these go to network directly, don't cache API calls
    }
    // For CDN resources (Bootstrap, fonts), try cache first
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // For HTML navigation: network-first
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For GLB models and large assets: cache-first (they never change)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
