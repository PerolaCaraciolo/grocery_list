const CACHE_NAME = "lista-ligeira-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/pages/historico-listas.html",
    "/pages/nova-lista.html",
    "/assets/style.css",
    "/scripts/script.js",
    "/scripts/historico.js",
    "/scripts/detalhes.js"
];

// Instala o service worker e armazena os arquivos no cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Ativa o service worker e limpa caches antigos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepta as requisições e responde com os arquivos em cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
