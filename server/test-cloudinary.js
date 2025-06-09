const cloudinary = require('cloudinary').v2;

// Print out Cloudinary configuration - DO NOT CHECK THIS INTO VERSION CONTROL
console.log('Checking Cloudinary configuration...');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'Not set');
console.log('CLOUDINARY_API_KEY set:', !!process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET set:', !!process.env.CLOUDINARY_API_SECRET);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection to Cloudinary
async function testCloudinaryConnection() {
  try {
    // Test API access with a simple ping
    const result = await cloudinary.api.ping();
    console.log('Cloudinary API connection successful:', result);
    return true;
  } catch (error) {
    console.error('Cloudinary API connection failed:', error.message);
    return false;
  }
}

// Create a diagnostic function
async function diagnoseCloudinaryIssues() {
  // Test basic connectivity
  const isConnected = await testCloudinaryConnection();
  
  console.log(`Cloudinary connection status: ${isConnected ? 'SUCCESSFUL' : 'FAILED'}`);
  
  if (!isConnected) {
    console.log('\nPossible issues:');
    console.log('1. Check that your .env file contains the correct Cloudinary credentials');
    console.log('2. Verify that your Cloudinary account is active');
    console.log('3. Check your internet connection');
    console.log('4. Ensure no firewall is blocking access to the Cloudinary API');
  } else {
    console.log('\nCloudinary integration appears to be working properly!');
  }
}

diagnoseCloudinaryIssues().catch(console.error);
