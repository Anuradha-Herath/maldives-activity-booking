const https = require('https');
const http = require('http');

async function testURL(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    success: res.statusCode >= 200 && res.statusCode < 300,
                    status: res.statusCode,
                    statusMessage: res.statusMessage,
                    data: data
                });
            });
        });
        
        req.on('error', (error) => {
            resolve({
                success: false,
                error: error.message
            });
        });
        
        req.setTimeout(30000, () => {
            req.destroy();
            resolve({
                success: false,
                error: 'Timeout (30s)'
            });
        });
    });
}

async function testDeployment() {
    console.log('🔍 Testing Maldives Activity Booking Deployment');
    console.log('==============================================');
    
    const backendURLs = [
        'https://maldives-activity-booking-backend.onrender.com',
        'https://maldives-activity-booking-api.onrender.com'
    ];
    
    const frontendURL = 'https://maldives-activity-booking-frontend.onrender.com';
    
    // Test frontend
    console.log('\n1. Testing Frontend...');
    const frontendResult = await testURL(frontendURL);
    if (frontendResult.success) {
        console.log('✅ Frontend is accessible');
    } else {
        console.log('❌ Frontend failed:', frontendResult.error || frontendResult.status);
    }
    
    // Test backend URLs
    console.log('\n2. Testing Backend URLs...');
    let workingBackend = null;
    
    for (const url of backendURLs) {
        console.log(`\nTesting: ${url}`);
        const result = await testURL(url);
        
        if (result.success) {
            console.log('✅ Backend accessible');
            workingBackend = url;
            
            // Test API endpoints
            const statusResult = await testURL(`${url}/api/v1/server-status`);
            if (statusResult.success) {
                console.log('✅ Server status endpoint working');
            } else {
                console.log('❌ Server status failed:', statusResult.error || statusResult.status);
            }
            
            const activitiesResult = await testURL(`${url}/api/v1/activities`);
            if (activitiesResult.success) {
                console.log('✅ Activities endpoint working');
                try {
                    const data = JSON.parse(activitiesResult.data);
                    console.log(`📊 Activities count: ${data.count || 'unknown'}`);
                } catch (e) {
                    console.log('⚠️ Response not valid JSON');
                }
            } else {
                console.log('❌ Activities endpoint failed:', activitiesResult.error || activitiesResult.status);
            }
            
            break; // Found working backend, no need to test others
        } else {
            console.log('❌ Backend not accessible:', result.error || result.status);
        }
    }
    
    console.log('\n📋 SUMMARY');
    console.log('==========');
    
    if (workingBackend) {
        console.log(`✅ Working backend found: ${workingBackend}`);
        console.log('\n💡 RECOMMENDATION:');
        console.log(`Update frontend VITE_API_URL to: ${workingBackend}/api/v1`);
        console.log('Then redeploy the frontend.');
    } else {
        console.log('❌ No working backend found');
        console.log('\n🚨 ISSUES:');
        console.log('1. Backend service may be sleeping (Render free tier)');
        console.log('2. Backend service may not be deployed correctly');
        console.log('3. Service name mismatch in deployment');
        console.log('\n💡 RECOMMENDATIONS:');
        console.log('1. Check Render dashboard for actual service names and URLs');
        console.log('2. Try accessing the backend URL multiple times to wake it up');
        console.log('3. Check backend deployment logs for errors');
        console.log('4. Verify environment variables are set correctly');
    }
}

testDeployment().catch(console.error);
