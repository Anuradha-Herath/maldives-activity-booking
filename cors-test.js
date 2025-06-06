#!/usr/bin/env node

/**
 * CORS Diagnostic Script
 * Tests if your frontend can connect to the backend
 */

const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';

console.log('🔍 CORS Diagnostic Test');
console.log('======================\n');

async function testCORS(frontendUrl) {
  console.log(`Testing CORS for: ${frontendUrl}`);
  
  try {
    // Simulate a request from the frontend
    const response = await fetch(`${BACKEND_URL}/api/v1/activities`, {
      method: 'GET',
      headers: {
        'Origin': frontendUrl,
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ CORS Working - ${data.count} activities found`);
      return true;
    } else {
      console.log(`❌ CORS Error - Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Request Failed: ${error.message}`);
    return false;
  }
}

async function main() {
  // Test common frontend URLs
  const testUrls = [
    'https://maldives-activity-booking-frontend.onrender.com',
    'https://maldives-activities.netlify.app',
    'https://main--maldives-activities.netlify.app',
    'https://maldives-activities.vercel.app'
  ];
  
  console.log('Testing CORS for common frontend URLs:\n');
  
  for (const url of testUrls) {
    await testCORS(url);
    console.log('');
  }
  
  console.log('🔧 If none work, you need to:');
  console.log('1. Find your actual frontend URL');
  console.log('2. Add it to CORS_ORIGIN in server/.env');
  console.log('3. Restart your backend service');
  console.log('4. Wait 1-2 minutes for changes to take effect');
  
  console.log('\n📋 To find your frontend URL:');
  console.log('- Check your deployment platform dashboard');
  console.log('- Look at the URL in your browser');
  console.log('- Check deployment logs for the assigned URL');
}

main().catch(console.error);
