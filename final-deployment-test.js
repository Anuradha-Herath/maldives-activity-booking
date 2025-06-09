// Final Deployment Test - Wake Up and Verify Backend
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';
const FRONTEND_URL = 'https://maldives-activity-booking-frontend.onrender.com';

async function finalDeploymentTest() {
    console.log('🎯 FINAL DEPLOYMENT TEST');
    console.log('========================');
    console.log(`Backend: ${BACKEND_URL}`);
    console.log(`Frontend: ${FRONTEND_URL}`);
    console.log('');

    // Test 1: Backend Wake-up (may take several minutes)
    console.log('1️⃣ Testing Backend Connectivity...');
    const backendResult = await testBackendWithRetry();
    
    // Test 2: Frontend Access
    console.log('2️⃣ Testing Frontend Access...');
    const frontendResult = await testFrontend();
    
    // Test 3: API Endpoints
    if (backendResult) {
        console.log('3️⃣ Testing API Endpoints...');
        await testAPIEndpoints();
    }
    
    // Final Report
    console.log('\n📊 FINAL TEST RESULTS');
    console.log('=====================');
    console.log(`Backend: ${backendResult ? '✅ WORKING' : '❌ FAILED'}`);
    console.log(`Frontend: ${frontendResult ? '✅ WORKING' : '❌ FAILED'}`);
    
    if (backendResult && frontendResult) {
        console.log('\n🎉 SUCCESS! Both services are working correctly.');
        console.log('🌐 Your application is ready to use!');
    } else {
        console.log('\n🔧 ISSUES DETECTED:');
        if (!backendResult) {
            console.log('- Backend service needs attention');
            console.log('- Check Render deployment logs');
            console.log('- Verify environment variables');
        }
        if (!frontendResult) {
            console.log('- Frontend service needs attention');
        }
    }
}

async function testBackendWithRetry() {
    const maxAttempts = 8;
    const delay = 45000; // 45 seconds between attempts
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`   Attempt ${attempt}/${maxAttempts} - Waking up backend...`);
        
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'GET',
                mode: 'cors'
            });
            
            console.log(`   Status: ${response.status}`);
            
            if (response.ok) {
                console.log('   ✅ Backend is awake and responding!');
                return true;
            } else if (response.status === 503 || response.status === 502) {
                console.log('   💤 Backend is starting up...');
            }
        } catch (error) {
            console.log(`   ❌ Connection error: ${error.message}`);
        }
        
        if (attempt < maxAttempts) {
            console.log(`   ⏳ Waiting ${delay/1000} seconds before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    console.log('   ❌ Backend failed to respond after all attempts');
    return false;
}

async function testFrontend() {
    try {
        const response = await fetch(FRONTEND_URL, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            console.log('   ✅ Frontend is accessible');
            return true;
        } else {
            console.log(`   ❌ Frontend returned status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`   ❌ Frontend error: ${error.message}`);
        return false;
    }
}

async function testAPIEndpoints() {
    const endpoints = [
        { path: '/api/v1/server-status', name: 'Server Status' },
        { path: '/api/v1/activities', name: 'Activities API' }
    ];
    
    for (const endpoint of endpoints) {
        try {
            console.log(`   Testing ${endpoint.name}...`);
            const response = await fetch(`${BACKEND_URL}${endpoint.path}`, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(`   ✅ ${endpoint.name}: Working`);
                
                if (endpoint.path.includes('activities')) {
                    console.log(`      📊 Activities found: ${data.count || 0}`);
                }
            } else {
                console.log(`   ❌ ${endpoint.name}: Failed (${response.status})`);
            }
        } catch (error) {
            console.log(`   ❌ ${endpoint.name}: Error - ${error.message}`);
        }
    }
}

// Run the test
finalDeploymentTest().catch(console.error);
