const CACHE_NAME = 'micro_service_v1';
const URLS_TO_CACHE = [
    '/', // cache the root page
    '/offline', // cache the offline page
    '/favicon.ico',
    // '/_next/static/*', // cache Next.js static css files
];

// Install Service Worker and Cache Resources
const installEvent = () => {
    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                console.log('Open Cache')
                return cache.addAll(URLS_TO_CACHE);
            })
        );
    });

}
installEvent()


// Activate the new Service Worker and remove old caches
const activeEvent = () => {
    self.addEventListener('activate', (event) => {
        const cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });
}
activeEvent()


// Intercept network requests and serve cached resources if available

const fetchEvent = () => {
    self.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // Serve the cached resource if it exists, otherwise fetch from network
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    // Cache fetched resources dynamically
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(() => {
                    // If offline and the requested resource is not in the cache, return the offline page
                    return caches.match('/offline');
                });
            })
        );
    });
}

fetchEvent()
