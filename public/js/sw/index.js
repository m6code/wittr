var staticCacheName = 'wittr-static-v3'; // name of current cache

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Fetch current cache
    caches.open(staticCacheName).then(function(cache) {
    // TODO: cache /skeleton rather than the root page

      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});
 
// Removes old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('wittr-') &&
          cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName)
        })
      )
    })
  );
});

self.addEventListener('fetch', function(event) {
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message 
self.addEventListener('message', function(event){
  if(event.data.action == 'skipWaiting'){
    self.skipWaiting();
  }
});