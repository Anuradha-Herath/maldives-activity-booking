// Production Upload Test
// Test the actual production upload endpoint to diagnose the issue

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testProductionUpload() {
  console.log('🚀 Testing Production Image Upload');
  console.log('=' .repeat(50));
  
  const frontendOrigin = 'https://maldives-activity-booking-frontend.onrender.com';
  const backendUrl = 'https://maldives-activity-booking-backend.onrender.com/api/v1';
  
  // Test 1: Server Status
  try {
    console.log('1. Testing server status...');
    const statusResponse = await axios.get(`${backendUrl}/server-status`, {
      headers: {
        'Origin': frontendOrigin
      }
    });
    console.log('✅ Server Status: OK');
    console.log('   CORS Origins:', statusResponse.data.cors.allowedOrigins);
  } catch (error) {
    console.log('❌ Server Status: FAILED');
    console.log('   Error:', error.message);
    return;
  }
  
  // Test 2: CORS Preflight for Upload
  try {
    console.log('2. Testing CORS preflight for upload...');
    const preflightResponse = await axios.options(`${backendUrl}/upload`, {
      headers: {
        'Origin': frontendOrigin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      }
    });
    console.log('✅ CORS Preflight: OK');
  } catch (error) {
    console.log('❌ CORS Preflight: FAILED');
    console.log('   Error:', error.response?.status, error.response?.data || error.message);
  }
  
  // Test 3: Actual Upload Test
  try {
    console.log('3. Testing actual file upload...');
    
    // Create a test image
    const testImagePath = path.join(__dirname, 'prod-test-image.png');
    const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA6wjuggAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(base64PNG, 'base64');
    fs.writeFileSync(testImagePath, buffer);
    
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath), {
      filename: 'prod-test-image.png',
      contentType: 'image/png'
    });
    
    console.log('   Creating upload request...');
    const uploadResponse = await axios.post(`${backendUrl}/upload`, form, {
      headers: {
        ...form.getHeaders(),
        'Origin': frontendOrigin
      },
      timeout: 30000
    });
    
    console.log('✅ Upload: SUCCESS');
    console.log('   Response:', uploadResponse.data);
    console.log('   URL:', uploadResponse.data.data?.url);
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    
  } catch (error) {
    console.log('❌ Upload: FAILED');
    console.log('   Status:', error.response?.status);
    console.log('   Headers:', error.response?.headers);
    console.log('   Data:', error.response?.data);
    console.log('   Message:', error.message);
    
    // Show more details if available
    if (error.response) {
      console.log('   Response Error Details:');
      console.log('     Status Code:', error.response.status);
      console.log('     Status Text:', error.response.statusText);
      console.log('     CORS Headers:');
      console.log('       Access-Control-Allow-Origin:', error.response.headers['access-control-allow-origin']);
      console.log('       Access-Control-Allow-Methods:', error.response.headers['access-control-allow-methods']);
      console.log('       Access-Control-Allow-Headers:', error.response.headers['access-control-allow-headers']);
    }
  }
  
  // Test 4: Check Environment Variables on Backend
  try {
    console.log('4. Checking backend environment...');
    const envResponse = await axios.get(`${backendUrl}/server-status`, {
      headers: {
        'Origin': frontendOrigin
      }
    });
    
    console.log('✅ Backend Environment:');
    console.log('   Node Env:', envResponse.data.env.nodeEnv);
    console.log('   CORS Origin Raw:', envResponse.data.env.corsOriginRaw);
    console.log('   Port:', envResponse.data.env.port);
    
  } catch (error) {
    console.log('❌ Environment Check: FAILED');
    console.log('   Error:', error.message);
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('Production Upload Test Complete');
}

testProductionUpload().catch(console.error);
