// Final Deployment Verification Script
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';
const FRONTEND_URL = 'https://maldives-activity-booking-frontend.onrender.com';
const API_PATH = '/api/v1';

async function verifyDeployment() {
    console.log('🚀 FINAL DEPLOYMENT VERIFICATION');
    console.log('==============================');

    // 1. Check API root
    console.log('\n1️⃣ Checking API root...');
    await testEndpoint(`${BACKEND_URL}${API_PATH}`);

    // 2. Check activities endpoint
    console.log('\n2️⃣ Checking activities endpoint...');
    const activitiesData = await testEndpoint(`${BACKEND_URL}${API_PATH}/activities`);
    
    // 3. Summary
    console.log('\n📊 VERIFICATION RESULTS:');
    
    if (activitiesData && activitiesData.success) {
        console.log('✅ DEPLOYMENT SUCCESSFUL!');
        console.log(`✅ Found ${activitiesData.count || 0} activities in database`);
        console.log('✅ API routes are correctly serving with /api/v1 prefix');
        console.log('✅ Frontend should now be able to load activities');
    } else {
        console.log('❌ VERIFICATION FAILED');
        console.log('❌ Activities endpoint is not returning expected data');
    }

    console.log('\n🌐 NEXT STEPS:');
    console.log(`1. Visit the frontend: ${FRONTEND_URL}`);
    console.log('2. Verify activities load correctly on the home page');
}

async function testEndpoint(url) {
    try {
        console.log(`Testing: ${url}`);
        const response = await fetch(url);
        const status = response.status;
        
        console.log(`Status: ${status} ${response.statusText}`);
        
        if (response.ok) {
            try {
                const data = await response.json();
                console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
                return data;
            } catch (err) {
                console.log('Error parsing JSON:', err.message);
                return null;
            }
        } else {
            console.log('Failed with status:', status);
            return null;
        }
    } catch (error) {
        console.log('Request failed:', error.message);
        return null;
    }
}

// Run the verification
verifyDeployment().catch(console.error);
