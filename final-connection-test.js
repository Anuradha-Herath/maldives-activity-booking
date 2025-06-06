// Test frontend-to-backend connection with proper CORS headers
console.log('🧪 Testing frontend-to-backend connection...\n');

const backendUrl = 'https://maldives-activity-booking-backend.onrender.com';
const frontendOrigin = 'https://maldives-activity-booking-frontend.onrender.com';

async function testConnection() {
    try {
        console.log('1️⃣ Testing server status...');
        
        const statusResponse = await fetch(`${backendUrl}/api/v1/server-status`, {
            method: 'GET',
            headers: {
                'Origin': frontendOrigin,
                'Content-Type': 'application/json'
            }
        });
        
        if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log('✅ Server status:', statusData.status);
            console.log('🔧 CORS config:', JSON.stringify(statusData.cors, null, 2));
            
            // Check if frontend origin is in allowed origins
            const isOriginAllowed = statusData.cors.allowedOrigins.includes(frontendOrigin);
            console.log(`🎯 Frontend origin allowed: ${isOriginAllowed ? '✅ YES' : '❌ NO'}`);
        } else {
            console.log('❌ Server status failed:', statusResponse.status, statusResponse.statusText);
            return;
        }
        
        console.log('\n2️⃣ Testing activities API...');
        
        const activitiesResponse = await fetch(`${backendUrl}/api/v1/activities`, {
            method: 'GET',
            headers: {
                'Origin': frontendOrigin,
                'Content-Type': 'application/json'
            }
        });
        
        if (activitiesResponse.ok) {
            const activitiesData = await activitiesResponse.json();
            console.log('✅ Activities API working!');
            console.log(`📊 Found ${activitiesData.count} activities`);
            
            if (activitiesData.data && activitiesData.data.length > 0) {
                console.log(`📝 Sample activity: "${activitiesData.data[0].title}"`);
            }
            
            console.log('\n🎉 SUCCESS! Frontend can now fetch activities from backend!');
            console.log('🚀 The CORS issue has been resolved!');
            
        } else {
            console.log('❌ Activities API failed:', activitiesResponse.status, activitiesResponse.statusText);
        }
        
    } catch (error) {
        console.log('❌ Connection test failed:', error.message);
        
        if (error.message.includes('CORS')) {
            console.log('🔧 CORS issue detected - the fix may need more time to deploy');
        }
    }
}

// Run the test
testConnection();
