const CACHE_NAME = 'micro_service_v1';
const URLS_TO_CACHE = [
    '/', // cache the root page
    '/offline', // cache the offline page
    '/favicon.ico',
    '/_next/static/css', // cache Next.js static css files
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

// Intercept network requests and serve cached resources if available
self.addEventListener('fetch', (event) => {
    console.log('Fetch')

    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found or fetch from network
            return response || fetch(event.request);
        })
    );
});

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
