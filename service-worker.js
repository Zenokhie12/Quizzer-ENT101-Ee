self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("quiz-cache").then(cache => {
      return cache.addAll([
        "./",
        "./main.html",
        "./img/home.png",
        "./styles.css",
        "./script.js",
        "./questioners.json",
        "./manifest.json",
        "./icons/icon-192.png",
        "./icons/icon-512.png"
      ])
    })
  )
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
