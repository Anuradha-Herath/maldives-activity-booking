// Comprehensive application test script
console.log('Starting application tests...');
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

async function testAPI() {
  console.log('🧪 Testing Maldives Activity Booking API...\n');
  
  const tests = [
    {
      name: 'Activities Endpoint',
      url: `${API_BASE_URL}/activities`,
      expectedFields: ['success', 'count', 'data']
    },
    {
      name: 'Popular Activities',
      url: `${API_BASE_URL}/activities?popular=true`,
      expectedFields: ['success', 'count', 'data']
    },
    {
      name: 'Categories Endpoint',
      url: `${API_BASE_URL}/categories`,
      expectedFields: ['success', 'count', 'data']
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      const response = await axios.get(test.url);
      
      // Check if response has expected structure
      const hasAllFields = test.expectedFields.every(field => 
        response.data.hasOwnProperty(field)
      );
      
      if (hasAllFields && response.data.success === true) {
        console.log(`✅ ${test.name}: PASSED`);
        console.log(`   - Status: ${response.status}`);
        console.log(`   - Data count: ${response.data.count || 0}`);
        console.log(`   - Has data: ${Array.isArray(response.data.data) ? 'Yes' : 'No'}\n`);
        passedTests++;
      } else {
        console.log(`❌ ${test.name}: FAILED - Invalid response structure`);
        console.log(`   - Response:`, response.data);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: FAILED`);
      console.log(`   - Error: ${error.message}\n`);
    }
  }

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All API tests passed! The backend is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the backend server.');
  }
}

// Test individual activity data structure
async function testActivityDataStructure() {
  console.log('\n🔍 Testing Activity Data Structure...\n');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/activities`);
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      const activity = response.data.data[0];
      console.log('Sample activity structure:');
      console.log({
        id: activity._id || 'missing',
        title: activity.title || 'missing',
        description: activity.description || 'missing',
        price: activity.price || 'missing',
        image: activity.image || 'missing',
        category: activity.category || 'missing',
        location: activity.location || 'missing',
        duration: activity.duration || 'missing'
      });
      
      // Check for required fields
      const requiredFields = ['_id', 'title', 'description', 'price'];
      const missingFields = requiredFields.filter(field => !activity[field]);
      
      if (missingFields.length === 0) {
        console.log('✅ Activity data structure is complete');
      } else {
        console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
      }
    } else {
      console.log('❌ No activity data found');
    }
  } catch (error) {
    console.log(`❌ Error testing activity structure: ${error.message}`);
  }
}

// Run all tests
async function runAllTests() {
  try {
    await testAPI();
    await testActivityDataStructure();
    
    console.log('\n🏁 Testing completed!');
    console.log('\nNext steps:');
    console.log('1. Check browser console at http://localhost:3001 for any JavaScript errors');
    console.log('2. Navigate through the application pages');
    console.log('3. Test filtering and search functionality');
    console.log('4. Verify responsive design on different screen sizes');
    
  } catch (error) {
    console.log(`Fatal error: ${error.message}`);
  }
}

runAllTests();
