const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://maldives-activity-booking-backend.onrender.com/api/v1';

console.log('🧪 Testing Upload Fix Implementation');
console.log('=====================================');

async function testBackendHealth() {
  console.log('\n1. Testing backend health...');
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log('✅ Backend health check passed:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ Backend health check failed:', error.message);
    return false;
  }
}

async function testCORS() {
  console.log('\n2. Testing CORS configuration...');
  try {
    // Test OPTIONS request (preflight)
    const response = await axios.options(`${API_URL}/upload`, {
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,Authorization',
        'Origin': 'https://maldives-activity-booking-frontend.onrender.com'
      }
    });
    console.log('✅ CORS preflight check passed');
    return true;
  } catch (error) {
    console.log('❌ CORS preflight check failed:', error.message);
    if (error.response) {
      console.log('Response headers:', error.response.headers);
    }
    return false;
  }
}

async function testUploadWithoutAuth() {
  console.log('\n3. Testing upload without authentication...');
  try {
    const formData = new FormData();
    
    // Create a simple test image buffer
    const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGAWzrQTAAAAABJRU5ErkJggg==', 'base64');
    formData.append('file', testImageBuffer, {
      filename: 'test.png',
      contentType: 'image/png'
    });
    
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Origin': 'https://maldives-activity-booking-frontend.onrender.com'
      },
      timeout: 30000
    });
    
    console.log('✅ Upload without auth successful');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Upload without auth failed:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', error.response.data);
      console.log('Response headers:', error.response.headers);
    }
    return false;
  }
}

async function testUploadWithAuth() {
  console.log('\n4. Testing upload with authentication...');
  try {
    // First, try to get a token (this might fail if auth is required, but that's okay)
    let token = null;
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@test.com',
        password: 'admin123'
      });
      if (loginResponse.data.success) {
        token = loginResponse.data.token;
        console.log('📝 Got auth token for testing');
      }
    } catch (authError) {
      console.log('⚠️  Could not get auth token, testing without auth');
    }
    
    const formData = new FormData();
    
    // Create a simple test image buffer
    const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGAWzrQTAAAAABJRU5ErkJggg==', 'base64');
    formData.append('file', testImageBuffer, {
      filename: 'test-auth.png',
      contentType: 'image/png'
    });
    
    const headers = {
      ...formData.getHeaders(),
      'Origin': 'https://maldives-activity-booking-frontend.onrender.com'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers,
      timeout: 30000
    });
    
    console.log('✅ Upload with auth successful');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Upload with auth failed:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
    return false;
  }
}

async function runTests() {
  console.log('Starting comprehensive upload fix verification...\n');
  
  const results = {
    health: await testBackendHealth(),
    cors: await testCORS(),
    uploadNoAuth: await testUploadWithoutAuth(),
    uploadWithAuth: await testUploadWithAuth()
  };
  
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Upload functionality should be working.');
  } else if (results.health && (results.uploadNoAuth || results.uploadWithAuth)) {
    console.log('✅ Core upload functionality is working. Some edge cases may need attention.');
  } else {
    console.log('⚠️  Upload functionality needs attention. Check the failing tests above.');
  }
}

runTests().catch(console.error);
