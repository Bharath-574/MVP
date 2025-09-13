// This is the name of our cache.
const CACHE_NAME = 'my-pwa-cache-v1';

// A list of all files that we want to cache.
const urlsToCache = [
  './', // Caches the main index.html file
  './index.html',
  './manifest.json',
  // You would add other files here like CSS, JS, and images
  // './citizen/css/style.css',
  // './citizen/js/main.js'
];

// The 'install' event is fired when the service worker is first installed.
self.addEventListener('install', (event) => {
  // We use event.waitUntil() to ensure the service worker isn't installed
  // until all the files are added to the cache.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// The 'fetch' event is fired for every network request made by the page.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the request is in the cache, we return the cached version.
        if (response) {
          return response;
        }

        // Otherwise, we fetch the request from the network.
        return fetch(event.request);
      })
  );
});
