// Simple frontend-backend connectivity test
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

async function testFrontendBackendConnection() {
  console.log('🔗 Testing Frontend-Backend Connection...\n');
  
  try {
    console.log('Testing direct API call from frontend environment...');
    
    // Test with CORS headers like the frontend would send
    const response = await axios.get(`${API_BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3001'
      },
      withCredentials: true
    });
    
    console.log('✅ Frontend can successfully connect to backend!');
    console.log(`📊 Received ${response.data.count} activities`);
    console.log(`🎯 Response status: ${response.status}`);
    
    // Test if activities have the expected structure for frontend
    const activities = response.data.data || [];
    const activeActivities = activities.filter(activity => activity.status === 'active');
    
    console.log(`🟢 Active activities: ${activeActivities.length}`);
    console.log(`📋 Total activities: ${activities.length}`);
    
    if (activeActivities.length > 0) {
      console.log('✅ Frontend will be able to display activities!');
      console.log('\nSample activity data:');
      const sample = activeActivities[0];
      console.log(`- Title: ${sample.title}`);
      console.log(`- Price: $${sample.price}`);
      console.log(`- Location: ${sample.location}`);
      console.log(`- Status: ${sample.status}`);
    } else {
      console.log('⚠️  No active activities found - frontend will show empty state');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Frontend-Backend connection failed!');
    console.log(`Error: ${error.message}`);
    
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    
    if (error.code === 'ERR_NETWORK') {
      console.log('🔍 This looks like a CORS or network connectivity issue');
    }
    
    return false;
  }
}

// Run the test
testFrontendBackendConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 All systems ready! Your application should work correctly.');
      console.log('🌐 Open http://localhost:3001 to test the frontend');
    } else {
      console.log('\n❌ Connection issues detected. Please check:');
      console.log('1. Backend server is running on port 5000');
      console.log('2. CORS configuration includes http://localhost:3001');
      console.log('3. No firewall blocking the connection');
    }
  })
  .catch(console.error);
