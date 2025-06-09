// Deployment watcher - checks when the new API routes are available
const fetch = require('node-fetch');

const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';
const MAX_ATTEMPTS = 20;
const CHECK_INTERVAL = 30000; // 30 seconds between checks

async function watchDeployment() {
  console.log('📡 DEPLOYMENT WATCHER');
  console.log('====================');
  console.log(`🎯 Watching for new /api/v1 routes to become available`);
  console.log(`🔄 Will check every ${CHECK_INTERVAL / 1000} seconds, up to ${MAX_ATTEMPTS} times`);
  console.log(`⏰ Total maximum wait time: ${(MAX_ATTEMPTS * CHECK_INTERVAL) / 60000} minutes\n`);

  let attemptCount = 0;
  
  while (attemptCount < MAX_ATTEMPTS) {
    attemptCount++;
    console.log(`\n🔍 Check #${attemptCount} @ ${new Date().toLocaleTimeString()}`);
    
    // Check if the new API endpoint is available
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/activities`);
      console.log(`Status: ${response.status}`);
      
      if (response.ok) {
        // Success! The new API endpoint is working
        const data = await response.json();
        console.log(`✅ SUCCESS! New API routes are now available!`);
        console.log(`📊 Found ${data.count || 0} activities via new endpoint`);
        console.log(`\n🎉 DEPLOYMENT COMPLETE - Frontend should now work correctly!`);
        return true;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    
    // If we reach here, the endpoint is not yet available
    if (attemptCount < MAX_ATTEMPTS) {
      console.log(`⏳ Waiting ${CHECK_INTERVAL/1000} seconds for next check...`);
      await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
    } else {
      console.log(`\n❌ Reached maximum number of attempts (${MAX_ATTEMPTS})`);
      console.log(`\n💡 POSSIBLE ISSUES:`);
      console.log(`1. Deployment is still in progress - continue waiting`);
      console.log(`2. Deployment failed - check Render dashboard for errors`);
      console.log(`3. Configuration issue - verify your server.js routes`);
      console.log(`\n🔧 RECOMMENDED ACTIONS:`);
      console.log(`1. Manually trigger a rebuild on Render dashboard`);
      console.log(`2. Check deployment logs on Render`);
      console.log(`3. Verify your CORS and API route configurations`);
    }
  }
  
  return false;
}

// Start watching the deployment
watchDeployment().catch(error => {
  console.error('Error in deployment watcher:', error);
});
