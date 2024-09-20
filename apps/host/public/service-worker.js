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

async function handleFetchRequest(event) {
    try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);

        // Cache the fetched resource dynamically
        await cache.put(event.request, networkResponse.clone());

        // Return the network response to the browser
        return networkResponse;
    } catch (error) {
        console.error('Fetch failed; returning offline page instead.', error);
        return caches.match('/offline');
    }
}

const fetchEvent = () => {
    self.addEventListener('fetch', (event) => {
        event.respondWith(handleFetchRequest(event));
    });
}

fetchEvent()
