// 中身を変えたら CACHE_NAME の数字を上げる（上げないと古いままになる）
const CACHE_NAME = 'shuushuu3-18'; // v3 は shuushuu3- で始める（元の版・v2と混ざらないように）
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('shuushuu3-') && k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// ネットがあれば新しいほう、無ければキャッシュ（車内で電波が切れても開ける）
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // 共有（Firestore）の通信や外のライブラリには手を出さない。このサイトの物だけ
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    // ブラウザの一時保存（GitHub Pages は10分）を飛ばして、毎回サーバーに新しいか聞く
    fetch(e.request, { cache: 'no-cache' }).then(r => {
      const copy = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
