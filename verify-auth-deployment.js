#!/usr/bin/env node

/**
 * Authentication Deployment Verification Tool
 * ------------------------------------------
 * This tool tests your authentication configuration in the deployed environment
 * 
 * Run with: node verify-auth-deployment.js [backend-url] [frontend-url]
 * Example: node verify-auth-deployment.js https://maldives-activity-booking-backend.onrender.com https://maldives-activities.netlify.app
 */

const axios = require('axios');
const readline = require('readline');
const { URL } = require('url');
const { performance } = require('perf_hooks');

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Default URLs
let BACKEND_URL = process.argv[2] || 'https://maldives-activity-booking-backend.onrender.com';
let FRONTEND_URL = process.argv[3] || 'https://maldives-activities.netlify.app';

// Remove trailing slashes
if (BACKEND_URL.endsWith('/')) BACKEND_URL = BACKEND_URL.slice(0, -1);
if (FRONTEND_URL.endsWith('/')) FRONTEND_URL = FRONTEND_URL.slice(0, -1);

// Add API path if not present
const API_URL = BACKEND_URL.includes('/api/v1') ? BACKEND_URL : `${BACKEND_URL}/api/v1`;

// Formatting helpers
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Logging functions
function logSection(title) {
  console.log(`\n${colors.bright}${colors.cyan}=== ${title} ===${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
}

function logDetail(title, detail) {
  console.log(`   ${colors.dim}${title}:${colors.reset} ${detail}`);
}

async function testBackendConnection() {
  logSection('Testing Backend Connectivity');
  
  try {
    const startTime = performance.now();
    const response = await axios.get(`${BACKEND_URL}/api/v1`, {
      timeout: 10000 // 10 second timeout
    });
    const endTime = performance.now();
    
    if (response.status === 200) {
      logSuccess(`Backend is reachable (${Math.round(endTime - startTime)}ms)`);
      logDetail('Status', response.status);
      logDetail('Message', response.data?.message || 'No message');
      return true;
    } else {
      logWarning(`Backend returned unexpected status: ${response.status}`);
      return false;
    }
  } catch (error) {
    logError(`Failed to connect to backend: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      logError('The backend server appears to be down or unreachable');
    }
    if (error.code === 'ENOTFOUND') {
      logError('The backend domain cannot be resolved. Check the URL.');
    }
    return false;
  }
}

async function testCORSConfiguration() {
  logSection('Testing CORS Configuration');
  
  try {
    // Test with explicit origin header to simulate browser behavior
    const response = await axios.get(`${API_URL}/server-status`, {
      headers: {
        'Origin': FRONTEND_URL
      }
    });
    
    // Check for CORS headers
    const corsOrigin = response.headers['access-control-allow-origin'];
    const corsCredentials = response.headers['access-control-allow-credentials'];
    
    if (corsOrigin) {
      if (corsOrigin === '*') {
        logWarning('CORS is set to allow all origins (*). This is insecure for authentication.');
      } else if (corsOrigin === FRONTEND_URL) {
        logSuccess('CORS is correctly configured for your frontend');
      } else {
        logWarning(`CORS is configured but for a different origin: ${corsOrigin}`);
      }
      
      logDetail('Access-Control-Allow-Origin', corsOrigin);
    } else {
      logError('CORS headers not found in response');
    }
    
    if (corsCredentials) {
      if (corsCredentials === 'true') {
        logSuccess('Credentials are allowed in CORS (required for cookies)');
      } else {
        logError('Credentials are not allowed in CORS configuration');
      }
      logDetail('Access-Control-Allow-Credentials', corsCredentials);
    } else {
      logError('Credentials header not found in CORS configuration');
    }
    
    return true;
  } catch (error) {
    logError(`CORS test failed: ${error.message}`);
    return false;
  }
}

async function testAuthEndpoints() {
  logSection('Testing Auth Endpoints');
  let success = true;
  
  try {
    // Test auth status endpoint
    const statusResponse = await axios.get(`${API_URL}/auth/status`);
    if (statusResponse.status === 200) {
      logSuccess('Auth status endpoint is working');
      logDetail('Response', JSON.stringify(statusResponse.data));
    } else {
      logError(`Auth status endpoint returned unexpected status: ${statusResponse.status}`);
      success = false;
    }
  } catch (error) {
    logError(`Auth status endpoint failed: ${error.message}`);
    success = false;
  }
  
  try {
    // Create a test account for registration test
    const randomSuffix = Math.floor(Math.random() * 10000);
    const testUser = {
      name: `Test User ${randomSuffix}`,
      email: `test${randomSuffix}@example.com`,
      password: 'Password123!'
    };
    
    logInfo(`Testing registration with email: ${testUser.email}`);
    
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': FRONTEND_URL
      }
    });
    
    if (registerResponse.status === 201 || registerResponse.status === 200) {
      logSuccess('Registration endpoint is working');
      
      if (registerResponse.data.token) {
        logSuccess('JWT token received after registration');
        
        // Check for authentication cookie
        if (registerResponse.headers['set-cookie']) {
          logSuccess('Authentication cookie set after registration');
          
          // Check cookie attributes
          const cookieHeader = registerResponse.headers['set-cookie'][0];
          
          if (cookieHeader.includes('HttpOnly')) {
            logSuccess('Cookie has HttpOnly flag (secure)');
          } else {
            logWarning('Cookie is missing HttpOnly flag');
          }
          
          if (cookieHeader.includes('SameSite=None')) {
            logSuccess('Cookie has SameSite=None (required for cross-origin)');
          } else {
            logWarning('Cookie is missing SameSite=None setting');
          }
          
          if (cookieHeader.includes('Secure')) {
            logSuccess('Cookie has Secure flag (HTTPS only)');
          } else {
            logWarning('Cookie is missing Secure flag');
          }
        } else {
          logWarning('No authentication cookie set after registration');
        }
      } else {
        logError('No JWT token returned from registration');
        success = false;
      }
    } else {
      logWarning(`Registration returned unexpected status: ${registerResponse.status}`);
      success = false;
    }
    
    // Test login with the same user
    try {
      logInfo(`Testing login with email: ${testUser.email}`);
      
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Origin': FRONTEND_URL
        }
      });
      
      if (loginResponse.status === 200) {
        logSuccess('Login endpoint is working');
        
        if (loginResponse.data.token) {
          logSuccess('JWT token received after login');
          
          // Use the token to test a protected endpoint
          try {
            const meResponse = await axios.get(`${API_URL}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${loginResponse.data.token}`,
                'Origin': FRONTEND_URL
              }
            });
            
            if (meResponse.status === 200) {
              logSuccess('Protected endpoint (auth/me) is working with JWT token');
              logDetail('User data', JSON.stringify(meResponse.data));
            }
          } catch (meError) {
            logError(`Protected endpoint test failed: ${meError.message}`);
            success = false;
          }
        } else {
          logError('No JWT token returned from login');
          success = false;
        }
      } else {
        logWarning(`Login returned unexpected status: ${loginResponse.status}`);
        success = false;
      }
    } catch (loginError) {
      logError(`Login test failed: ${loginError.message}`);
      success = false;
    }
  } catch (error) {
    logError(`Registration test failed: ${error.message}`);
    success = false;
  }
  
  return success;
}

// Main function
async function runTests() {
  console.log(`\n${colors.bright}${colors.bgBlue}${colors.white} Authentication Deployment Verification Tool ${colors.reset}`);
  console.log(`${colors.cyan}Testing against backend: ${colors.bright}${BACKEND_URL}${colors.reset}`);
  console.log(`${colors.cyan}Frontend URL: ${colors.bright}${FRONTEND_URL}${colors.reset}\n`);
  
  const backendReachable = await testBackendConnection();
  if (!backendReachable) {
    logError('Backend unreachable, cannot continue tests');
    process.exit(1);
  }
  
  await testCORSConfiguration();
  const authSuccess = await testAuthEndpoints();
  
  logSection('Test Summary');
  if (authSuccess) {
    logSuccess('All core authentication functions are working correctly!');
    console.log(`\n${colors.green}Your authentication system appears to be working in the deployment environment.${colors.reset}`);
    console.log(`You can now test the full user flow by:
1. Opening ${FRONTEND_URL} in your browser
2. Creating a new account or logging in
3. Checking that you stay logged in between page refreshes`);
  } else {
    logWarning('Some authentication tests failed. See details above.');
    console.log(`\n${colors.yellow}Recommendations to fix the issues:${colors.reset}
1. Check backend logs for detailed error information
2. Verify CORS configuration is correct (run fix-backend-deployment.js)
3. Ensure cookie settings are appropriate for cross-origin requests
4. Verify frontend is using the correct API URL
5. Check that all environment variables are properly set`);
  }
  
  process.exit(0);
}

runTests().catch(error => {
  console.error(`${colors.red}Unexpected error: ${error.message}${colors.reset}`);
  process.exit(1);
});
