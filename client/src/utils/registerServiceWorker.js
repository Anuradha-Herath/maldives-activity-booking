// Register the cache-busting service worker in production only
if (import.meta.env.PROD) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/cache-buster-sw.js')
        .then(registration => {
          console.log('Cache-buster service worker registered:', registration.scope);
        })
        .catch(error => {
          console.error('Service worker registration failed:', error);
        });
    });
  }
}
