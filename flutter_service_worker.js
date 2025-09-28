'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "b716efbcc5cded31178664ecdfa58c98",
"version.json": "6eca211c49092a13c8642a780756e189",
"index.html": "0336d594ccdbee7f881beef3692a17e8",
"/": "0336d594ccdbee7f881beef3692a17e8",
"main.dart.js": "53762be54ec5907446ffe382a175aa48",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "563ebbf5330ec058ead7c33e2625d15f",
"main.dart.mjs": "dc704927892379313c35202dfe246956",
"icons/Icon-192.png": "15d1015653bc4561efcebd12bee389f0",
"icons/Icon-maskable-192.png": "15d1015653bc4561efcebd12bee389f0",
"icons/Icon-maskable-512.png": "f18bda7e5c37a19f1db8c2b75261b7d8",
"icons/Icon-512.png": "f18bda7e5c37a19f1db8c2b75261b7d8",
"manifest.json": "e12a3f6739d9ab43c891f1bfd87d5cf2",
"main.dart.wasm": "6ddb339fd398a26b1abf137c86c1b0a4",
"assets/AssetManifest.json": "bb2ddfef2a05000a661461ceb41ff79b",
"assets/NOTICES": "fc01a7cfc9a3322653fe742a70a4f326",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "062ea7a8f6afbe8c50e499e5d77e2323",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
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
"loader_style.css": "198127468a63af9b24f0dae64ee9463e",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b"};
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
