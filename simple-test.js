console.log('🧪 Testing Upload Fix Implementation');

const axios = require('axios');
const API_URL = 'https://maldives-activity-booking-backend.onrender.com/api/v1';

async function testBackend() {
  try {
    console.log('Testing backend health...');
    const response = await axios.get(`${API_URL}/health`);
    console.log('✅ Backend is accessible:', response.data);
  } catch (error) {
    console.log('❌ Backend test failed:', error.message);
  }
}

testBackend();
