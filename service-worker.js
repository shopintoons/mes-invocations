// service-worker.js neutralisé
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  // On supprime tous les caches existants
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", event => {
  // On laisse le navigateur gérer normalement
});
