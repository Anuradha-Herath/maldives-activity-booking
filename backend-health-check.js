// Backend Health Check and Wake-up Script
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';
const MAX_RETRIES = 10;
const RETRY_DELAY = 30000; // 30 seconds

async function checkBackendHealth() {
    console.log('🏥 Starting comprehensive backend health check...');
    console.log(`🎯 Target: ${BACKEND_URL}`);
    console.log('⏰ This may take several minutes for sleeping services...\n');

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`🔄 Attempt ${attempt}/${MAX_RETRIES} - Checking backend...`);
        
        try {
            // Test root endpoint
            const rootResponse = await fetch(BACKEND_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log(`📡 Root endpoint status: ${rootResponse.status}`);

            if (rootResponse.status === 200) {
                console.log('✅ Backend is awake and responding!');
                
                // Test API endpoints
                await testAPIEndpoints();
                return true;
            } else if (rootResponse.status === 503) {
                console.log('💤 Service is starting up (503 - Service Unavailable)');
                console.log(`⏳ Waiting ${RETRY_DELAY/1000} seconds before retry...`);
            } else {
                console.log(`⚠️ Unexpected status: ${rootResponse.status}`);
            }

        } catch (error) {
            console.log(`❌ Connection failed: ${error.message}`);
        }

        // Wait before retry (except on last attempt)
        if (attempt < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }

    console.log('❌ Backend failed to wake up after all attempts');
    return false;
}

async function testAPIEndpoints() {
    console.log('\n🧪 Testing API endpoints...');

    const endpoints = [
        { path: '/api/v1/server-status', name: 'Server Status' },
        { path: '/api/v1/activities', name: 'Activities API' }
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`🔍 Testing: ${endpoint.name}`);
            const response = await fetch(`${BACKEND_URL}${endpoint.path}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${endpoint.name}: Working`);
                
                if (endpoint.path === '/api/v1/activities') {
                    console.log(`   📊 Activities count: ${data.count || 'N/A'}`);
                }
            } else {
                console.log(`❌ ${endpoint.name}: Failed (${response.status})`);
            }
        } catch (error) {
            console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
        }
    }
}

async function generateDiagnosticReport() {
    console.log('\n📋 DIAGNOSTIC REPORT');
    console.log('══════════════════════════════════════');
    
    const backendWorking = await checkBackendHealth();
    
    if (!backendWorking) {
        console.log('\n🔧 RECOMMENDED ACTIONS:');
        console.log('1. Check Render dashboard for deployment logs');
        console.log('2. Verify environment variables are set correctly');
        console.log('3. Check if MongoDB connection is working');
        console.log('4. Ensure all dependencies are properly installed');
        console.log('5. Verify the build and start commands in render.yaml');
        
        console.log('\n🚨 LIKELY CAUSES:');
        console.log('• Service is sleeping (normal for free tier)');
        console.log('• Build failed during deployment');
        console.log('• Missing or incorrect environment variables');
        console.log('• Database connection issues');
        console.log('• Code errors preventing startup');
    }
}

// Run the diagnostic
generateDiagnosticReport().catch(console.error);
