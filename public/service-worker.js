self.addEventListener('install', async function() {
    const cache = await caches.open('youtubeDL');
    cache.addAll([
        '/bundle.js',
        '/ponyfill.min.js',
        '/streamSaver.js',
        // '/index.html',
    ])

    console.log('Install');
    self.skipWaiting();

    
});


self.addEventListener('fetch', event => {
    var prefix = 'https://cors-anywhere.herokuapp.com/';
    var url = event.request.url;

    if( url.includes('/base.js') ){
        event.respondWith(
            caches.open('youtubeDL')
              .then(function(cache) {
        
               return cache.match(event.request.url)
                .then(function(response) {
                    var fetchPromise = fetch(prefix + event.request.url)
                        .then(function(networkResponse) {
        
                            cache.put(event.request.url, networkResponse.clone());
                            return networkResponse;
                        })
        
                    // response contains cached data, if available
                    return response || fetchPromise;
              });
            })
          );
    }
    else if( url.includes('https://www.youtube.com') || url.includes('googlevideo.com/videoplayback') ){
        event.respondWith(fetch(prefix + url));
    }
    else if(url.includes(".js")) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
            })
        );
    }
    
});