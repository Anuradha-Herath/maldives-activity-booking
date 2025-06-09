// Test the CORS configuration parsing logic
require('dotenv').config({ path: './server/.env' });

console.log('Testing CORS configuration parsing...\n');

console.log('Raw CORS_ORIGIN from env:', process.env.CORS_ORIGIN);

// Test the parsing logic from the fixed server.js
const allowedOrigins = process.env.CORS_ORIGIN 
  ? (process.env.CORS_ORIGIN === '*' ? '*' : process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()))
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://maldives-activity-booking-frontend.onrender.com'];

console.log('Parsed allowedOrigins:', allowedOrigins);
console.log('Type of allowedOrigins:', typeof allowedOrigins);
console.log('Is array?', Array.isArray(allowedOrigins));

// Test origin checking logic
const testOrigins = [
  'https://maldives-activity-booking-frontend.onrender.com',
  'http://localhost:3000',
  'https://example.com', // Should be rejected
  null, // No origin (should be allowed)
  undefined
];

console.log('\nTesting origin validation:');
testOrigins.forEach(origin => {
  let allowed = false;
  
  if (!origin) {
    allowed = true; // Allow requests with no origin
  } else if (allowedOrigins === '*') {
    allowed = true; // Allow all origins if wildcard
  } else if (Array.isArray(allowedOrigins) && allowedOrigins.indexOf(origin) !== -1) {
    allowed = true; // Origin is in allowed list
  }
  
  console.log(`Origin: ${origin || 'No origin'} -> ${allowed ? 'ALLOWED' : 'REJECTED'}`);
});

console.log('\n✅ CORS configuration test completed!');
