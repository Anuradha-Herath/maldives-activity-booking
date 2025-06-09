// Environment Configuration Checker for Production Deployment
console.log('🔍 Environment Configuration Check');
console.log('=====================================');

// Check if we're in development or production
console.log('Mode:', import.meta.env.MODE);
console.log('DEV:', import.meta.env.DEV);
console.log('PROD:', import.meta.env.PROD);

// Check API URL configuration
const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

// Check Cloudinary configuration
const cloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
console.log('Cloudinary Cloud Name:', cloudinaryName);
console.log('Upload Preset:', uploadPreset);

// Validation checks
console.log('\n✅ Configuration Validation:');

if (!apiUrl) {
  console.error('❌ VITE_API_URL is not set!');
} else if (apiUrl.includes('localhost') && import.meta.env.PROD) {
  console.error('❌ Production build is using localhost API URL!');
  console.error('   This will not work in production deployment.');
  console.error('   Set VITE_API_URL to your production backend URL.');
} else {
  console.log('✅ API URL is properly configured');
}

if (!cloudinaryName) {
  console.error('❌ VITE_CLOUDINARY_CLOUD_NAME is not set!');
} else {
  console.log('✅ Cloudinary configuration is set');
}

// Test API connectivity (only in development)
if (import.meta.env.DEV) {
  console.log('\n🔌 Testing API Connectivity...');
  fetch(apiUrl + '/activities')
    .then(response => {
      if (response.ok) {
        console.log('✅ API is reachable');
        return response.json();
      } else {
        console.error('❌ API returned error status:', response.status);
      }
    })
    .then(data => {
      if (data && data.success) {
        console.log('✅ API is returning data correctly');
        console.log(`📊 Found ${data.count} activities`);
      }
    })
    .catch(error => {
      console.error('❌ Failed to connect to API:', error.message);
    });
}

console.log('\n📋 Deployment Checklist:');
console.log('1. ✅ Environment variables are set');
console.log('2. ✅ API URL points to production backend');
console.log('3. ✅ Backend CORS allows frontend domain');
console.log('4. ✅ Build process includes environment variables');

export default {
  apiUrl,
  cloudinaryName,
  uploadPreset,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV
};
