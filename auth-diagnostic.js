// auth-diagnostic.js
const axios = require('axios');

// Configuration (update these values)
const API_URL = process.env.API_URL || 'https://your-deployed-api-url.com/api/v1';
const TEST_USER = {
  name: 'Test Diagnostic',
  email: 'test-diagnostic@example.com',
  password: 'password123'
};

// Headers for all requests
const headers = { 'Content-Type': 'application/json' };
let token = null;

// Test database connection (indirectly)
async function testRegister() {
  console.log('🧪 TESTING USER REGISTRATION');
  try {
    console.log(`📤 Sending registration request to ${API_URL}/auth/register`);
    const response = await axios.post(`${API_URL}/auth/register`, TEST_USER, { headers });
    
    console.log('✅ Registration SUCCESS');
    console.log('📊 Response status:', response.status);
    console.log('📄 Response data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.token) {
      token = response.data.token;
      console.log('🔑 Token received:', token.substring(0, 15) + '...');
    } else {
      console.warn('⚠️  No token received in registration response');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Registration FAILED');
    logError(error);
    return false;
  }
}

// Test login
async function testLogin() {
  console.log('\n🧪 TESTING USER LOGIN');
  try {
    console.log(`📤 Sending login request to ${API_URL}/auth/login`);
    const response = await axios.post(
      `${API_URL}/auth/login`, 
      { email: TEST_USER.email, password: TEST_USER.password },
      { headers }
    );
    
    console.log('✅ Login SUCCESS');
    console.log('📊 Response status:', response.status);
    console.log('📄 Response data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.token) {
      token = response.data.token;
      console.log('🔑 Token received:', token.substring(0, 15) + '...');
    } else {
      console.warn('⚠️  No token received in login response');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Login FAILED');
    logError(error);
    return false;
  }
}

// Test protected route
async function testProtectedRoute() {
  console.log('\n🧪 TESTING PROTECTED ROUTE');
  if (!token) {
    console.warn('⚠️  No token available, skipping protected route test');
    return false;
  }
  
  try {
    console.log(`📤 Sending request to protected route ${API_URL}/auth/me`);
    const response = await axios.get(
      `${API_URL}/auth/me`,
      { 
        headers: { 
          ...headers, 
          'Authorization': `Bearer ${token}` 
        }
      }
    );
    
    console.log('✅ Protected route access SUCCESS');
    console.log('📊 Response status:', response.status);
    console.log('📄 Response data:', JSON.stringify(response.data, null, 2));
    
    return true;
  } catch (error) {
    console.error('❌ Protected route access FAILED');
    logError(error);
    return false;
  }
}

// Helper function to log errors
function logError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('📊 Status:', error.response.status);
    console.error('📄 Response data:', error.response.data);
    console.error('🔍 Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('🔌 No response received from server');
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('🚫 Error setting up request:', error.message);
  }
  
  if (error.config) {
    console.log('⚙️  Request Config:');
    console.log(`- URL: ${error.config.url}`);
    console.log(`- Method: ${error.config.method}`);
    console.log(`- Headers:`, error.config.headers);
    
    if (error.config.data) {
      try {
        const data = JSON.parse(error.config.data);
        console.log(`- Data:`, data);
      } catch (e) {
        console.log(`- Data: ${error.config.data}`);
      }
    }
  }
}

// Run all tests
async function runTests() {
  console.log('🔍 AUTH DIAGNOSTIC TOOL');
  console.log('===========================================');
  console.log('🌐 Testing against API URL:', API_URL);
  console.log('===========================================\n');
  
  const registerResult = await testRegister();
  
  // Wait a bit before continuing to next test
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const loginResult = await testLogin();
  
  // Wait a bit before continuing to next test
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const protectedResult = await testProtectedRoute();
  
  console.log('\n===========================================');
  console.log('📋 TEST SUMMARY');
  console.log('===========================================');
  console.log(`Registration Test: ${registerResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Login Test: ${loginResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Protected Route Test: ${protectedResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log('===========================================');
}

runTests().catch(console.error);
