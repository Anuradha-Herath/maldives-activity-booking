// Check API Endpoint Fix
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';

console.log('🔍 TESTING API ENDPOINTS FIX');
console.log('═════════════════════════════');

async function testEndpoints() {
  // Test 1: Root endpoint
  console.log('1️⃣ Testing root endpoint...');
  await testUrl(BACKEND_URL);
  
  // Test 2: API root endpoint
  console.log('\n2️⃣ Testing API root endpoint...');
  await testUrl(`${BACKEND_URL}/api/v1`);
  
  // Test 3: Server status endpoint
  console.log('\n3️⃣ Testing server status endpoint...');
  await testUrl(`${BACKEND_URL}/api/v1/server-status`);
  
  // Test 4: Activities endpoint
  console.log('\n4️⃣ Testing activities endpoint...');
  await testUrl(`${BACKEND_URL}/api/v1/activities`);
}

async function testUrl(url) {
  console.log(`📡 URL: ${url}`);
  try {
    const response = await fetch(url);
    const status = response.status;
    console.log(`🔢 Status code: ${status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Response:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('❌ Error response:');
      console.log(text);
    }
  } catch (error) {
    console.log(`❌ Fetch failed: ${error.message}`);
  }
}

testEndpoints();
