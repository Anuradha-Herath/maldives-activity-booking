// Production Cache Buster Service Worker
// This service worker prevents API response caching in production environments

// Force a no-cache policy for all API requests in production
self.addEventListener('fetch', (event) => {
  // Only handle API requests
  if (event.request.url.includes('/api/v1/') || 
      event.request.url.includes('_=')) {
    
    // Clone the request
    const noCacheRequest = new Request(event.request.url, {
      method: event.request.method,
      headers: {
        ...event.request.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        // Add a unique timestamp to bust cache
        'X-Cache-Bust': Date.now().toString()
      },
      mode: event.request.mode,
      credentials: event.request.credentials,
      redirect: event.request.redirect
    });
    
    // Use the modified request
    event.respondWith(
      fetch(noCacheRequest).then(response => {
        // Clone the response
        const noCacheResponse = response.clone();
        
        // Create a new response with no-cache headers
        return new Response(noCacheResponse.body, {
          status: noCacheResponse.status,
          statusText: noCacheResponse.statusText,
          headers: {
            ...noCacheResponse.headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      }).catch(error => {
        console.error('Service worker fetch error:', error);
        // Fall back to original request
        return fetch(event.request);
      })
    );
  }
});
