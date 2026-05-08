// Service Worker for XE Clone Currency Exchange
// Provides offline functionality and caching

const CACHE_NAME = 'xe-clone-v2.0.0';
const STATIC_CACHE = 'xe-clone-static-v2.0.0';
const DYNAMIC_CACHE = 'xe-clone-dynamic-v2.0.0';

// Files to cache for offline functionality
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/converter.html',
    '/details.html',
    '/history.html',
    '/settings.html',
    '/css/style.css',
    '/js/script.js',
    '/assets/favicon.ico',
    '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Old caches cleaned up');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests and external requests
    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    console.log('[SW] Serving from cache:', request.url);
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then((response) => {
                        // Check if response is valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseClone = response.clone();
                        
                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                console.log('[SW] Caching dynamic content:', request.url);
                                cache.put(request, responseClone);
                            })
                            .catch((error) => {
                                console.warn('[SW] Failed to cache dynamic content:', error);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to serve from cache
                        console.log('[SW] Network failed, trying cache fallback');
                        return caches.match(request);
                    });
            })
            .catch((error) => {
                console.error('[SW] Fetch error:', error);
                
                // Return offline page for HTML requests
                if (request.headers.get('accept').includes('text/html')) {
                    return caches.match('/index.html');
                }
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-conversions') {
        event.waitUntil(syncConversions());
    }
});

// Sync conversions when back online
async function syncConversions() {
    try {
        console.log('[SW] Syncing conversions...');
        
        // Get pending conversions from IndexedDB
        const pendingConversions = await getPendingConversions();
        
        // Sync each pending conversion
        for (const conversion of pendingConversions) {
            try {
                await syncConversion(conversion);
            } catch (error) {
                console.error('[SW] Failed to sync conversion:', error);
            }
        }
        
        console.log('[SW] Conversions synced successfully');
    } catch (error) {
        console.error('[SW] Sync failed:', error);
    }
}

// Get pending conversions from IndexedDB
async function getPendingConversions() {
    // Implementation would go here
    return [];
}

// Sync individual conversion
async function syncConversion(conversion) {
    // Implementation would go here
    console.log('[SW] Syncing conversion:', conversion);
}

// Push notification handler
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/assets/favicon.ico',
        badge: '/assets/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Open App',
                icon: '/assets/favicon.ico'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/favicon.ico'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('XE Clone - Currency Update', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for cache management
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CACHE_UPDATE':
            updateCache(payload);
            break;
            
        case 'CACHE_CLEAR':
            clearCache();
            break;
            
        default:
            console.warn('[SW] Unknown message type:', type);
    }
});

// Update specific cache
async function updateCache({ url, cacheType = DYNAMIC_CACHE }) {
    try {
        const cache = await caches.open(cacheType);
        const response = await fetch(url);
        
        if (response.ok) {
            await cache.put(url, response);
            console.log('[SW] Cache updated:', url);
        }
    } catch (error) {
        console.error('[SW] Failed to update cache:', error);
    }
}

// Clear all caches
async function clearCache() {
    try {
        const cacheNames = await caches.keys();
        
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        
        console.log('[SW] All caches cleared');
    } catch (error) {
        console.error('[SW] Failed to clear caches:', error);
    }
}

// Periodic background sync (if supported)
if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
        if (event.tag === 'update-rates') {
            event.waitUntil(updateExchangeRates());
        }
    });
}

// Update exchange rates in background
async function updateExchangeRates() {
    try {
        console.log('[SW] Updating exchange rates...');
        
        // Implementation would fetch latest rates
        // and update IndexedDB storage
        
        console.log('[SW] Exchange rates updated');
    } catch (error) {
        console.error('[SW] Failed to update exchange rates:', error);
    }
}
