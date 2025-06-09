// Simple connectivity test for deployed app
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com';

console.log('🔍 Starting deployment connectivity test...');
console.log('Backend URL:', BACKEND_URL);

// Test 1: Basic backend connectivity
async function testBackendRoot() {
    console.log('\n1️⃣ Testing backend root endpoint...');
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Backend root accessible');
            console.log('Response:', data);
            return true;
        } else {
            console.log('❌ Backend root failed:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.log('❌ Backend root error:', error.message);
        return false;
    }
}

// Test 2: Server status endpoint
async function testServerStatus() {
    console.log('\n2️⃣ Testing server status endpoint...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/server-status`, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Server status accessible');
            console.log('Status data:', data);
            return true;
        } else {
            console.log('❌ Server status failed:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.log('❌ Server status error:', error.message);
        return false;
    }
}

// Test 3: Activities API
async function testActivitiesAPI() {
    console.log('\n3️⃣ Testing activities API endpoint...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/activities`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Activities API accessible');
            console.log('Activities count:', data.count);
            console.log('Sample data:', data.data?.slice(0, 2)); // Show first 2 activities
            return true;
        } else {
            console.log('❌ Activities API failed:', response.status, response.statusText);
            const errorText = await response.text();
            console.log('Error response:', errorText);
            return false;
        }
    } catch (error) {
        console.log('❌ Activities API error:', error.message);
        console.log('This likely indicates CORS issues or backend being down');
        return false;
    }
}

// Test 4: CORS preflight
async function testCORS() {
    console.log('\n4️⃣ Testing CORS configuration...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/activities`, {
            method: 'OPTIONS',
            mode: 'cors',
            headers: {
                'Origin': window.location.origin,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('CORS preflight status:', response.status);
        
        // Check CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
            'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
        };
        
        console.log('CORS headers:', corsHeaders);
        return response.ok;
    } catch (error) {
        console.log('❌ CORS test failed:', error.message);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🎯 Running comprehensive connectivity tests...\n');
    
    const results = {
        backendRoot: await testBackendRoot(),
        serverStatus: await testServerStatus(),
        activitiesAPI: await testActivitiesAPI(),
        cors: await testCORS()
    };
    
    console.log('\n📊 Test Results Summary:');
    console.log('═══════════════════════════');
    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
    });
    
    const allPassed = Object.values(results).every(result => result);
    console.log('\n🎯 Overall Status:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
    
    if (!allPassed) {
        console.log('\n🔧 Troubleshooting suggestions:');
        if (!results.backendRoot) {
            console.log('- Backend server may be down or not deployed properly');
            console.log('- Check Render deployment logs');
        }
        if (!results.cors) {
            console.log('- CORS configuration may be incorrect');
            console.log('- Frontend domain not in allowed origins');
        }
        if (!results.activitiesAPI) {
            console.log('- Database connection issues');
            console.log('- API routing problems');
        }
    }
    
    return results;
}

// Export for use in other files
window.connectivityTest = runAllTests;

// Auto-run if this script is loaded directly
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', runAllTests);
}
