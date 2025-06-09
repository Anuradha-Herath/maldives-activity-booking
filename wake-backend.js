// Wake up Render backend service
// This script sends repeated requests to wake up the backend service
const fetch = require('node-fetch');

const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';
const MAX_ATTEMPTS = 10;
const RETRY_DELAY = 15000; // 15 seconds between attempts

async function wakeBackendService() {
  console.log('🔄 Attempting to wake up the backend service...');
  console.log(`🌐 URL: ${BACKEND_URL}`);
  console.log(`⏱️ Will try ${MAX_ATTEMPTS} times with ${RETRY_DELAY/1000} seconds between attempts\n`);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\n⏳ Attempt ${attempt}/${MAX_ATTEMPTS}...`);
    
    try {
      // Try both the root URL and the API root
      const rootResponse = await fetch(BACKEND_URL);
      console.log(`Root endpoint status: ${rootResponse.status}`);
      
      if (rootResponse.ok) {
        console.log('✅ Root endpoint is responding!');
        
        // Now check the API endpoint
        console.log('\nChecking API endpoint...');
        const apiResponse = await fetch(`${BACKEND_URL}/api/v1`);
        console.log(`API endpoint status: ${apiResponse.status}`);
        
        if (apiResponse.ok) {
          console.log('✅ API endpoint is responding!');
          console.log('\n🎉 SUCCESS: Backend service is now awake and ready!');
          
          // Check activities endpoint
          console.log('\nChecking activities endpoint...');
          const activitiesResponse = await fetch(`${BACKEND_URL}/api/v1/activities`);
          
          if (activitiesResponse.ok) {
            const data = await activitiesResponse.json();
            console.log(`✅ Activities endpoint is working! Found ${data.count || 'unknown'} activities`);
            return true;
          } else {
            console.log(`❌ Activities endpoint returned status: ${activitiesResponse.status}`);
          }
          
          return true;
        }
      }
      
      console.log('💤 Backend service is still starting up...');
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    if (attempt < MAX_ATTEMPTS) {
      console.log(`⏳ Waiting ${RETRY_DELAY/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    } else {
      console.log('\n❌ Maximum attempts reached. The backend service might be:');
      console.log('   1. Still deploying - check Render dashboard');
      console.log('   2. Having deployment issues - check Render logs');
      console.log('   3. Not properly configured - check API route paths');
    }
  }
  
  return false;
}

// Run the wake-up process
wakeBackendService()
  .then(success => {
    if (success) {
      console.log('\n✅ You can now check the frontend to see if activities load correctly');
    } else {
      console.log('\n❌ Unable to wake up the backend service');
    }
  })
  .catch(error => {
    console.error('Error in wake-up script:', error);
  });
