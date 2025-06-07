// auth-test.js - Run with Node.js to test authentication in deployed environment
const axios = require('axios');

// Update these with your deployed URLs
const API_URL = process.argv[2] || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
const EMAIL = process.argv[3] || 'test@example.com';
const PASSWORD = process.argv[4] || 'password123';
const NAME = 'Test User';

console.log(`Testing authentication at: ${API_URL}`);
console.log(`Using email: ${EMAIL}`);
console.log('-----------------------------------');

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

async function runTests() {
  try {
    // Step 1: Check if API is accessible
    console.log('Step 1: Testing API connection...');
    const serverStatus = await api.get('/');
    console.log('✅ API is accessible:', serverStatus.data.message || 'OK');
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    return;
  }

  // Step 2: Try to register a new user
  let userId, token;
  try {
    console.log('\nStep 2: Testing registration...');
    const registerResponse = await api.post('/auth/register', {
      name: NAME,
      email: EMAIL,
      password: PASSWORD
    });
    
    console.log('✅ Registration successful');
    console.log('Response:', registerResponse.data);
    token = registerResponse.data.token;
    userId = registerResponse.data.user?.id;
    
    console.log('Token received:', token ? '✅ Yes' : '❌ No');
    console.log('User ID:', userId || 'Not found');
  } catch (error) {
    if (error.response?.data?.error?.includes('duplicate')) {
      console.log('ℹ️ User already exists, proceeding to login');
    } else {
      console.error('❌ Registration failed:', error.response?.data || error.message);
      // Continue to login since the user might already exist
    }
  }

  // Step 3: Try to log in
  try {
    console.log('\nStep 3: Testing login...');
    const loginResponse = await api.post('/auth/login', {
      email: EMAIL,
      password: PASSWORD
    });
    
    console.log('✅ Login successful');
    token = loginResponse.data.token;
    userId = loginResponse.data.user?.id;
    
    console.log('Token received:', token ? '✅ Yes' : '❌ No');
    console.log('User ID:', userId || 'Not found');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return; // Can't continue without authentication
  }

  // Step 4: Test protected route
  try {
    console.log('\nStep 4: Testing protected route (auth/me)...');
    // Set the token in authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const meResponse = await api.get('/auth/me');
    console.log('✅ Protected route access successful');
    console.log('User data:', meResponse.data);
  } catch (error) {
    console.error('❌ Protected route access failed:', error.response?.data || error.message);
  }

  // Step 5: Test logout
  try {
    console.log('\nStep 5: Testing logout...');
    const logoutResponse = await api.get('/auth/logout');
    console.log('✅ Logout successful');
    console.log('Response:', logoutResponse.data);
  } catch (error) {
    console.error('❌ Logout failed:', error.response?.data || error.message);
  }

  console.log('\n-----------------------------------');
  console.log('Authentication test completed!');
}

runTests().catch(console.error);
