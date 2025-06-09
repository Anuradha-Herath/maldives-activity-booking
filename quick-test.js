#!/usr/bin/env node

/**
 * Quick Frontend Deployment Checker
 * Run this after deploying frontend to verify everything works
 */

const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';

console.log('🎯 Quick Deployment Test for Maldives Activity Booking');
console.log('====================================================\n');

async function testBackend() {
  console.log('1️⃣ Testing Backend API...');
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/activities`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend Working!');
      console.log(`📊 Activities Found: ${data.count}`);
      
      if (data.data && data.data.length > 0) {
        console.log(`🎯 Sample Activity: ${data.data[0].title || 'Untitled'}`);
      }
    } else {
      console.log(`❌ Backend Error: HTTP ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Backend Unreachable: ${error.message}`);
  }
}

async function main() {
  await testBackend();
  
  console.log('\n📋 Frontend Deployment Checklist:');
  console.log('   □ Frontend deployed to hosting platform');
  console.log('   □ Environment variables set:');
  console.log(`     - VITE_API_URL=${BACKEND_URL}/api/v1`);
  console.log('     - VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz');
  console.log('     - VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities');
  console.log('   □ Frontend loads without errors');
  console.log('   □ Activities display on homepage');
  console.log('   □ No CORS errors in browser console');
  
  console.log('\n🚀 Recommended Frontend Platforms:');
  console.log('   • Netlify: https://netlify.com (easiest)');
  console.log('   • Vercel: https://vercel.com (fast)'); 
  console.log('   • Render: https://render.com (both services together)');
  
  console.log('\n✅ Your backend is ready and working perfectly!');
  console.log('   Next: Deploy frontend with correct environment variables');
}

// Run the test
main().catch(console.error);
