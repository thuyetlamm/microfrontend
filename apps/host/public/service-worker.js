const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
    '/', // cache the root page
    '/offline', // cache the offline page
    '/favicon.ico',
    '/_next/static/*', // cache Next.js static files
];

// Install Service Worker and Cache Resources
const installEvent = () => {
    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME).then(async (cache) => {
                const fetchPromises = URLS_TO_CACHE.map(async (url) => {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Request for ${url} failed with status ${response.status}`);
                        }
                        await cache.put(url, response); // Manually cache each response
                    } catch (error) {
                        console.error(`Failed to cache ${url}:`, error);
                    }
                });
                return Promise.all(fetchPromises);
            })
        );
    });

}
installEvent()

// Intercept network requests and serve cached resources if available
self.addEventListener('fetch', (event) => {
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
