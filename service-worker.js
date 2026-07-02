let cacheName = "v2.0.16";

// Mise en cache initiale des ressources
self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                "index.html",
                "icon-512x512.png",
                "bg_texture.jpg",
                "Roboto.ttf",
				"pitchy/fft.js",
				"pitchy/fft.js.map",
				"pitchy/pitchy.js",
				"pitchy/pitchy.js.map",
                "css/styles.css",
                "css/vibrato-panel.css",
                "js/main.js",
                "js/data/notes-config.js",
                "js/harmonic-tuner-notes.js",
                "js/mic-tuner.js",
                "js/settings-storage.js",
                "js/ui-frequency-slider.js",
                "js/ui-graduation-big.js",
                "js/ui-graduation-circles.js",
                "js/ui-graduation-mini.js",
                "js/ui-memory-buttons.js",
                "js/ui-mixer.js",
                "js/ui-note-layout.js",
                "js/ui-settings-panel.js",
                "js/vibrato-analysis.js",
                "js/vibrato-canvas-init.js",
                "js/vibrato-start.js",
            ]);
        })
    );
});

// Mise à jour du cache lorsqu'une ressource est requêtée
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return fetch(event.request).then(response => {
                // Si la réponse est valide, on la stocke en cache pour une utilisation ultérieure
                if (response.status === 200) {
                    cache.put(event.request.url, response.clone());
                }
                return response;
            }).catch(() => {
                // Si la requête échoue, on tente de récupérer la ressource depuis le cache
                return cache.match(event.request);
            });
        })
    );
});

// Mise à jour automatique du cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    // On supprime les anciennes versions du cache
                    if (thisCacheName !== cacheName) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        }).then(function() {
            // Le nouveau service worker prend immédiatement le contrôle des onglets déjà
            // ouverts, au lieu d'attendre leur fermeture complète (comportement par défaut).
            return self.clients.claim();
        })
    );
});
