const CACHE_NAME = "DayLyft-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Only handle GET navigation/asset requests. API calls (POST) and other
  // methods must go straight to the network.
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});