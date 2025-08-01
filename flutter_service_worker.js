'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "f3b533fd9c2e2416310b999fc4476c69",
"version.json": "6eca211c49092a13c8642a780756e189",
"index.html": "d44df976352d747b7db0986d1c4fd86c",
"/": "d44df976352d747b7db0986d1c4fd86c",
"main.dart.js": "503ef2b8241011ae4ed843520464ae37",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "563ebbf5330ec058ead7c33e2625d15f",
"main.dart.mjs": "dd009a55ab24fc9a2a52ee09d55c5247",
"icons/Icon-192.png": "15d1015653bc4561efcebd12bee389f0",
"icons/Icon-maskable-192.png": "15d1015653bc4561efcebd12bee389f0",
"icons/Icon-maskable-512.png": "f18bda7e5c37a19f1db8c2b75261b7d8",
"icons/Icon-512.png": "f18bda7e5c37a19f1db8c2b75261b7d8",
"manifest.json": "03c9748377efdea5d4e2e9cfe6f339a2",
"main.dart.wasm": "53b21f2afbd51f55347f068b4a4bd58e",
"assets/AssetManifest.json": "bb2ddfef2a05000a661461ceb41ff79b",
"assets/NOTICES": "2782961c8c2607fc69229f9fda33226d",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "062ea7a8f6afbe8c50e499e5d77e2323",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "825e75415ebd366b740bb49659d7a5c6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e65f8e9d24b12c0a99c9c276297d853d",
"assets/fonts/MaterialIcons-Regular.otf": "032f9debbe761e6317dc1988e1573ea8",
"assets/assets/spritesheet_aliens.xml": "cd199eeb7b1113064e418520a7697fa9",
"assets/assets/images/colored_shroom.png": "27e418128ba1d753484e921518640ad8",
"assets/assets/images/colored_grass.png": "7bd17e389c561c89adbee9dcb8cdd132",
"assets/assets/images/spritesheet_aliens.png": "833723a023a63fa96e4454099f324a37",
"assets/assets/images/markus-spiske-qjnAnF0jIGk-unsplash.jpg": "5170ec913383711ea0fc46aecf42a702",
"assets/assets/images/colored_land.png": "de6d828153e3340a5f717a21c8734d8a",
"assets/assets/images/colored_desert.png": "458b620a0878bb54b89aa433bf8bde07",
"assets/assets/images/spritesheet_tiles.png": "87ad65157477fe436781fc8a9c8cf388",
"assets/assets/images/Logo.png": "1e7169efd16ed8f91c6aacc7a6414a99",
"assets/assets/images/spritesheet_elements.png": "232e4cd3f862137d20782e3f246d6384",
"assets/assets/spritesheet_tiles.xml": "29a4c2f0bed31fb3e50cd91e1d60ed34",
"assets/assets/json/build_a_custom_flutter_widget_from_scratch.md": "3cf9929f7db0ebe2863009fac93f1f58",
"assets/assets/json/optimize_flutter_performance.md": "c895efba411a86d5234154be1fe879ff",
"assets/assets/json/blog.json": "0d81e9d23dd5a795fe63c41c862e6e75",
"assets/assets/json/bloc_vs_provider.md": "ec5a4332fb559a1bfe2e87792067339c",
"assets/assets/spritesheet_elements.xml": "6256971f66572a95f8755fe45064640f",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "9fe690d47b904d72c7d020bd303adf16",
"canvaskit/canvaskit.js.symbols": "27361387bc24144b46a745f1afe92b50",
"canvaskit/skwasm.wasm": "1c93738510f202d9ff44d36a4760126b",
"canvaskit/chromium/canvaskit.js.symbols": "f7c5e5502d577306fb6d530b1864ff86",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "c054c2c892172308ca5a0bd1d7a7754b",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "a37f2b0af4995714de856e21e882325c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
