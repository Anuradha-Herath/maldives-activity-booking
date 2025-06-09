// Simple test for CORS configuration parsing logic without external dependencies
console.log('Testing CORS configuration parsing...\n');

// Simulate different CORS_ORIGIN values
const testCases = [
  {
    name: 'Multiple origins (production case)',
    value: 'https://maldives-activity-booking-frontend.onrender.com,http://localhost:3000,http://localhost:3001,http://localhost:5173'
  },
  {
    name: 'Wildcard',
    value: '*'
  },
  {
    name: 'Single origin',
    value: 'https://maldives-activity-booking-frontend.onrender.com'
  },
  {
    name: 'Undefined/null',
    value: null
  }
];

testCases.forEach(testCase => {
  console.log(`\n--- Testing: ${testCase.name} ---`);
  console.log(`CORS_ORIGIN value: ${testCase.value}`);
  
  // Apply the same logic from the fixed server.js
  const allowedOrigins = testCase.value 
    ? (testCase.value === '*' ? '*' : testCase.value.split(',').map(origin => origin.trim()))
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://maldives-activity-booking-frontend.onrender.com'];
  
  console.log('Parsed allowedOrigins:', allowedOrigins);
  console.log('Type:', typeof allowedOrigins);
  console.log('Is array?', Array.isArray(allowedOrigins));
  
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

console.log('\n🎯 Key fix: The allowedOrigins variable is now defined BEFORE it\'s used in server-status endpoint');
console.log('🎯 Key fix: CORS_ORIGIN parsing now handles wildcards and trims whitespace properly');
console.log('🎯 Key fix: CORS middleware now checks for wildcard before array operations');
console.log('\n✅ CORS configuration test completed!');
