'use strict';
importScripts('sw-toolbox.js');

toolbox.precache([
    "index.html",
    "build/css/app.css",
    "build/images/land/img_posterImg.png",
    "build/images/flags.007b2705.png",
    "build/images/favicon/favicon-32x32.png",
    "build/js/app.js",
    "build/js/auth.js",
    "build/fonts/Geometria-Medium.ce81051a.woff",
    "build/fonts/Geometria-Bold.3a9ed34b.woff",
    "build/fonts/Geometria.b7f74b26.woff",
    "build/fonts/fontawesome-webfont.20fd1704.woff2"
]);

toolbox.router.get('/build/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, {
    networkTimeoutSeconds: 5
});



/*
var updated = [//тут указываем скрипты которые не должны жестко кешироваться
    "https://soltyk.ru/broadcasts/1959750457-widget-3.js",
    "https://soltyk.ru/sw.js"//указал сам скрипт service worker, чтобы не кешировался жестко в будущем. Проверил. Оффлайн режим работает без него в этом кеше.
];
const version = "0.0.7";//тут может быть номер вашей версии
const CACHE = "soltyk-cache" + version;//вместо soltyk - используйте свое уникальное название или доменное имя
self.addEventListener('install', function(event) {
    var indexPage = new Request('index.html');
    event.waitUntil(fetch(indexPage).then(function(response) {
        var response2 = response.clone();
        return caches.open(CACHE).then(function(cache) {
            console.log('[PWA Builder] Cached index page during Install ' + response2.url);
            return cache.put(indexPage, response2)
        })
    }))
});
self.addEventListener('fetch', function(event) {
    var updateCache = function(request) {
        return caches.open(CACHE).then(function(cache) {
            return fetch(request).then(
                function(response2 = response.clone()) {
                    if (updated.indexOf(response2.url) != -1){
                        console.log('Исключен из кеша ' + response2.url)
                    }else{
                        console.log('[PWA Builder] add page to offline ' + response2.url)
                        return cache.put(request.clone(), response2)
                    }
                })
        })
    };
    event.waitUntil(updateCache(event.request));
    event.respondWith(fetch(event.request).catch(function(error) {
        console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
        return caches.open(CACHE).then(function(cache) {
            return cache.match(event.request).then(function(matching) {
                var report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                return report
            })
        })
    }))
})

//  */