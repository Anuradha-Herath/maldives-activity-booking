/**
 * comprehensive-auth-test.js
 * 
 * This script tests the complete authentication flow in the deployed application
 * It will:
 * 1. Test the API connection
 * 2. Register a new test user
 * 3. Verify login with the new user
 * 4. Check token persistence and auth status
 * 5. Logout and verify state
 */

const axios = require('axios');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration
const API_BASE_URL = process.env.API_URL || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://maldives-activity-booking-frontend.onrender.com';

// Utility to generate a unique email
const generateTestEmail = () => {
  const timestamp = new Date().getTime();
  return `test-user-${timestamp}@example.com`;
};

// Test user data
const testUser = {
  name: 'Test User',
  email: generateTestEmail(),
  password: 'Test@123'
};

// Store token and cookies for subsequent requests
let authToken = null;
let cookieJar = [];

// Configure axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to include cookies
api.interceptors.request.use(config => {
  if (cookieJar.length > 0) {
    config.headers.Cookie = cookieJar.join('; ');
  }
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Intercept responses to save cookies
api.interceptors.response.use(response => {
  const setCookie = response.headers['set-cookie'];
  if (setCookie) {
    cookieJar = setCookie;
  }
  return response;
});

// Test API connection
const testConnection = async () => {
  console.log('\n🔍 Testing API connection...');
  try {
    const response = await api.get('/test-connection');
    console.log('✅ Connection successful!');
    console.log('📊 Server details:', response.data.server);
    console.log('📊 CORS configuration:', response.data.cors);
    return true;
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Register test user
const registerUser = async () => {
  console.log('\n🔍 Registering test user...');
  console.log('User details:', { ...testUser, password: '********' });
  
  try {
    const response = await api.post('/auth/register', testUser);
    console.log('✅ Registration successful!');
    console.log('📊 Response status:', response.status);
    
    // Save token
    if (response.data.token) {
      authToken = response.data.token;
      console.log('🔑 Token received and saved');
    } else {
      console.warn('⚠️  No token received in registration response');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Registration failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Login with test user
const loginUser = async () => {
  console.log('\n🔍 Testing login with newly created user...');
  
  try {
    const response = await api.post('/auth/login', {
      email: testUser.email,
      password: testUser.password
    });
    
    console.log('✅ Login successful!');
    console.log('📊 Response status:', response.status);
    
    // Save token
    if (response.data.token) {
      authToken = response.data.token;
      console.log('🔑 Token received and saved');
    } else {
      console.warn('⚠️  No token received in login response');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Login failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Check authentication status
const checkAuthStatus = async () => {
  console.log('\n🔍 Checking authentication status...');
  
  try {
    const response = await api.get('/auth/status');
    console.log('✅ Auth status check successful!');
    console.log('📊 Response:', response.data);
    
    if (response.data.authenticated) {
      console.log('🔒 User is authenticated');
      return true;
    } else {
      console.warn('⚠️  User is not authenticated according to server');
      return false;
    }
  } catch (error) {
    console.error('❌ Auth status check failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Get user profile
const getUserProfile = async () => {
  console.log('\n🔍 Fetching user profile...');
  
  try {
    const response = await api.get('/auth/me');
    console.log('✅ Profile fetch successful!');
    console.log('📊 User profile:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Profile fetch failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Logout user
const logoutUser = async () => {
  console.log('\n🔍 Testing logout...');
  
  try {
    const response = await api.get('/auth/logout');
    console.log('✅ Logout successful!');
    console.log('📊 Response:', response.data);
    
    // Clear token
    authToken = null;
    cookieJar = [];
    
    return true;
  } catch (error) {
    console.error('❌ Logout failed!');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
};

// Generate frontend URLs for testing
const generateFrontendUrls = () => {
  return {
    register: `${FRONTEND_URL}/signup`,
    login: `${FRONTEND_URL}/login`,
    home: FRONTEND_URL
  };
};

// Run all tests
const runTests = async () => {
  console.log('🚀 Starting comprehensive authentication flow test');
  console.log('📌 API URL:', API_BASE_URL);
  console.log('📌 Frontend URL:', FRONTEND_URL);
  
  // Step 1: Test connection
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.error('❌ Cannot proceed with tests due to connection failure');
    return;
  }
  
  // Step 2: Register user
  const registrationOk = await registerUser();
  if (!registrationOk) {
    console.error('❌ Cannot proceed with tests due to registration failure');
    return;
  }
  
  // Step 3: Check auth status after registration
  await checkAuthStatus();
  
  // Step 4: Get user profile after registration
  await getUserProfile();
  
  // Step 5: Logout
  await logoutUser();
  
  // Step 6: Check auth status after logout
  await checkAuthStatus();
  
  // Step 7: Login again
  const loginOk = await loginUser();
  if (!loginOk) {
    console.error('❌ Login test failed');
    return;
  }
  
  // Step 8: Check auth status after login
  await checkAuthStatus();
  
  // Step 9: Get user profile after login
  await getUserProfile();
  
  // Generate URLs for manual testing
  const frontendUrls = generateFrontendUrls();
  
  console.log('\n✨ Authentication flow test completed!');
  console.log('📝 Test user credentials:');
  console.log('  Email:', testUser.email);
  console.log('  Password:', testUser.password);
  
  console.log('\n🔗 URLs for manual testing:');
  console.log('  Register:', frontendUrls.register);
  console.log('  Login:', frontendUrls.login);
  console.log('  Home:', frontendUrls.home);
};

// Prompt user to start test
console.log('🧪 Maldives Activity Booking - Authentication Flow Test');
rl.question('Press Enter to start the tests or Ctrl+C to cancel...', async () => {
  await runTests();
  rl.close();
});

rl.on('close', () => {
  console.log('\n👋 Test completed. Goodbye!');
  process.exit(0);
});
