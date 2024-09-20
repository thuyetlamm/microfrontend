const CACHE_NAME = 'micro_service_v1';
const URLS_TO_CACHE = [
    '/', // cache the root page
    '/offline', // cache the offline page
    '/favicon.ico',
    '/_next/static/css/*', // cache Next.js static css files
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

const cacheClone = async (e) => {
    const res = await fetch(e.request)
    const resClone = res.clone()

    const cache = await caches.open(CACHE_NAME)
    await cache.put(e.request, resClone)
    return res
}


const fetchEvent = () => {
    self.addEventListener('fetch', (e) => {
        e.respondWith(
            cacheClone(e)
                .catch(() => caches.match(e.request))
                .then((res) => res)
        )
    })
}

fetchEvent()
