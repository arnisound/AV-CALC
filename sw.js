var CACHE='avcalc-v2';
var SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL).catch(function(){});}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var isDoc=e.request.mode==='navigate'||(e.request.destination==='document');
  if(isDoc){
    // Réseau d'abord pour le HTML : les mises à jour de l'app sont visibles tout de suite,
    // avec repli sur le cache hors-ligne.
    e.respondWith(
      fetch(e.request).then(function(res){
        var copy=res.clone();
        caches.open(CACHE).then(function(c){try{c.put(e.request,copy);}catch(err){}});
        return res;
      }).catch(function(){
        return caches.match(e.request).then(function(hit){return hit||caches.match('./index.html');});
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit)return hit;
      return fetch(e.request).then(function(res){
        var copy=res.clone();
        caches.open(CACHE).then(function(c){try{c.put(e.request,copy);}catch(err){}});
        return res;
      });
    })
  );
});
