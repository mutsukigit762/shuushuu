// 収集は ../ に引っ越した。/v3/ に残っている古い仕組みを片付けて消える
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(self.registration.unregister().then(() => self.clients.matchAll()).then(cs => cs.forEach(c => c.navigate('../'))));
});
