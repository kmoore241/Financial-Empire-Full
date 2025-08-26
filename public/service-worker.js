const CACHE_NAME = 'financial-empire-v1';
const STATIC_CACHE = 'static-v1';
const RUNTIME_CACHE = 'runtime-v1';

const urlsToCache = [
  '/',
  '/dashboard',
  '/offline',
  '/manifest.json'
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE, RUNTIME_CACHE].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE)
              .then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match('/offline');
            });
        })
    );
  } else {
    // For non-document requests, try cache first
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions when connection is restored
      console.log('Background sync triggered')
    );
  }
});