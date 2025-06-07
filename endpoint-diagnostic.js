// Manual test for API endpoints
// This script tests different routes to help diagnose deployment issues
const fetch = require('node-fetch');

const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';

async function testEndpointAccess() {
  console.log('🔍 TESTING API ENDPOINT ACCESS');
  console.log('===========================');

  // Test both old and new endpoints to determine what's actually working
  const endpoints = [
    { path: '/', name: 'Root' },
    { path: '/api', name: 'API Path' },
    { path: '/api/v1', name: 'API v1 Path' },
    { path: '/server-status', name: 'Old Server Status' },
    { path: '/api/v1/server-status', name: 'New Server Status' },
    { path: '/activities', name: 'Old Activities' },
    { path: '/api/v1/activities', name: 'New Activities' }
  ];

  for (const endpoint of endpoints) {
    const url = `${BACKEND_URL}${endpoint.path}`;
    try {
      console.log(`\nTesting ${endpoint.name} endpoint: ${url}`);
      const response = await fetch(url);
      
      console.log(`Status: ${response.status}`);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Response data:', JSON.stringify(data, null, 2).substring(0, 400) + (JSON.stringify(data).length > 400 ? '...' : ''));
        } else {
          const text = await response.text();
          console.log('Response text:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
        }
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

testEndpointAccess().then(() => {
  console.log('\n🏁 Testing complete!');
  console.log('\n💡 DIAGNOSIS:');
  console.log('If the old paths ("/activities") are working but new paths ("/api/v1/activities") are not:');
  console.log('1. The deployment may not have completed yet');
  console.log('2. There might be a configuration issue with Render');
  console.log('3. Try manually rebuilding the backend service on Render dashboard');
});
