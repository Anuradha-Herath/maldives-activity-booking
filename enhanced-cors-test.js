// Test the enhanced CORS configuration parsing logic
console.log('Testing enhanced CORS configuration parsing...\n');

// Simulate the problematic Render environment variable
const testCases = [
  {
    name: 'Render problematic format (with CORS_ORIGIN= prefix)',
    value: 'CORS_ORIGIN=https://maldives-activity-booking-frontend.onrender.com,http://localhost:3000,http://localhost:3001,http://localhost:5173'
  },
  {
    name: 'Normal format',
    value: 'https://maldives-activity-booking-frontend.onrender.com,http://localhost:3000,http://localhost:3001,http://localhost:5173'
  },
  {
    name: 'Wildcard with prefix',
    value: 'CORS_ORIGIN=*'
  },
  {
    name: 'Normal wildcard',
    value: '*'
  }
];

testCases.forEach(testCase => {
  console.log(`\n--- Testing: ${testCase.name} ---`);
  console.log(`Raw CORS_ORIGIN: ${testCase.value}`);
  
  // Apply the enhanced logic from the fixed server.js
  let corsOriginValue = testCase.value;
  if (corsOriginValue && corsOriginValue.startsWith('CORS_ORIGIN=')) {
    corsOriginValue = corsOriginValue.replace('CORS_ORIGIN=', '');
  }
  
  console.log(`Processed corsOriginValue: ${corsOriginValue}`);
  
  const allowedOrigins = corsOriginValue 
    ? (corsOriginValue === '*' ? '*' : corsOriginValue.split(',').map(origin => origin.trim()))
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://maldives-activity-booking-frontend.onrender.com'];
  
  console.log('Final allowedOrigins:', allowedOrigins);
  
  // Test origin validation
  const testOrigin = 'https://maldives-activity-booking-frontend.onrender.com';
  let allowed = false;
  
  if (allowedOrigins === '*') {
    allowed = true;
  } else if (Array.isArray(allowedOrigins) && allowedOrigins.indexOf(testOrigin) !== -1) {
    allowed = true;
  }
  
  console.log(`Frontend origin ${testOrigin} -> ${allowed ? 'ALLOWED ✅' : 'REJECTED ❌'}`);
});

console.log('\n🎯 Enhanced fix: Now handles CORS_ORIGIN= prefix from Render deployment');
console.log('✅ Enhanced CORS configuration test completed!');
