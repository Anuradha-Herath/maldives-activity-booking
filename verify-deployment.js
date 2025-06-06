#!/usr/bin/env node
/**
 * Production Deployment Verification Script
 * Run this after deploying to verify everything works correctly
 */

import https from 'https';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  // Update these URLs after deployment
  BACKEND_URL: 'https://maldives-activity-booking-backend.onrender.com',
  FRONTEND_URL: 'https://maldives-activity-booking-frontend.onrender.com',
  
  // Test endpoints
  ENDPOINTS: [
    '/api/v1/activities',
    '/api/v1/health', // if available
  ]
};

console.log('🚀 Starting Production Deployment Verification...\n');

/**
 * Make HTTPS request and return promise
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data: data
        });
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    // Set timeout
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Test backend endpoints
 */
async function testBackend() {
  console.log('📡 Testing Backend API...');
  
  for (const endpoint of CONFIG.ENDPOINTS) {
    const url = CONFIG.BACKEND_URL + endpoint;
    console.log(`  → Testing: ${url}`);
    
    try {
      const response = await makeRequest(url);
      
      if (response.statusCode === 200) {
        console.log(`    ✅ SUCCESS (${response.statusCode})`);
        
        // Parse and validate activities endpoint
        if (endpoint.includes('activities')) {
          try {
            const data = JSON.parse(response.data);
            const activities = data.data || data;
            console.log(`    📊 Found ${activities.length} activities`);
            
            if (activities.length > 0) {
              console.log(`    🎯 Sample activity: ${activities[0].title || 'Untitled'}`);
            }
          } catch (e) {
            console.log(`    ⚠️  Response not valid JSON`);
          }
        }
      } else {
        console.log(`    ❌ FAILED (${response.statusCode})`);
      }
    } catch (error) {
      console.log(`    ❌ ERROR: ${error.message}`);
    }
  }
}

/**
 * Test frontend
 */
async function testFrontend() {
  console.log('\n🌐 Testing Frontend Application...');
  
  try {
    const response = await makeRequest(CONFIG.FRONTEND_URL);
    
    if (response.statusCode === 200) {
      console.log(`  ✅ Frontend accessible (${response.statusCode})`);
      
      // Check for basic HTML structure
      if (response.data.includes('<html') && response.data.includes('</html>')) {
        console.log('  ✅ Valid HTML structure');
      }
      
      // Check for React app
      if (response.data.includes('id="root"') || response.data.includes('id="app"')) {
        console.log('  ✅ React app structure found');
      }
      
      // Check for title
      const titleMatch = response.data.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) {
        console.log(`  📄 Page title: ${titleMatch[1]}`);
      }
      
    } else {
      console.log(`  ❌ Frontend failed (${response.statusCode})`);
    }
  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
}

/**
 * Test CORS configuration
 */
async function testCORS() {
  console.log('\n🔒 Testing CORS Configuration...');
  
  const url = CONFIG.BACKEND_URL + '/api/v1/activities';
  
  try {
    const response = await makeRequest(url);
    
    const corsHeaders = {
      'access-control-allow-origin': response.headers['access-control-allow-origin'],
      'access-control-allow-methods': response.headers['access-control-allow-methods'],
      'access-control-allow-headers': response.headers['access-control-allow-headers'],
    };
    
    console.log('  📋 CORS Headers:');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      if (value) {
        console.log(`    ${key}: ${value}`);
      }
    });
    
    if (corsHeaders['access-control-allow-origin']) {
      console.log('  ✅ CORS configured');
    } else {
      console.log('  ⚠️  CORS headers not found');
    }
    
  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
}

/**
 * Display results summary
 */
function displaySummary() {
  console.log('\n📊 Deployment Verification Summary');
  console.log('=====================================');
  console.log(`Backend URL:  ${CONFIG.BACKEND_URL}`);
  console.log(`Frontend URL: ${CONFIG.FRONTEND_URL}`);
  console.log('\n✅ If all tests passed, your deployment is successful!');
  console.log('🌐 Visit your frontend URL to test the full application');
  console.log('\n📝 Next steps:');
  console.log('  1. Test the application manually in a browser');
  console.log('  2. Check activities load correctly');
  console.log('  3. Verify navigation works');
  console.log('  4. Test on mobile devices');
}

/**
 * Main verification process
 */
async function main() {
  try {
    await testBackend();
    await testFrontend();
    await testCORS();
    displaySummary();
  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.length > 2) {
  const backendUrl = process.argv[2];
  const frontendUrl = process.argv[3];
  
  if (backendUrl) CONFIG.BACKEND_URL = backendUrl;
  if (frontendUrl) CONFIG.FRONTEND_URL = frontendUrl;
}

console.log('Configuration:');
console.log(`  Backend:  ${CONFIG.BACKEND_URL}`);
console.log(`  Frontend: ${CONFIG.FRONTEND_URL}\n`);

// Run verification
main().catch(console.error);
