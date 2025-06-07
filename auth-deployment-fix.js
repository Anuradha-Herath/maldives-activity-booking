// Auth Deployment Fix Script
// Run on your deployment server: node auth-deployment-fix.js https://your-frontend-url.com

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const frontendUrl = args[0];

if (!frontendUrl) {
  console.error('Please provide your frontend URL as an argument');
  console.error('Example: node auth-deployment-fix.js https://maldives-activities.netlify.app');
  process.exit(1);
}

// Validate URL format
try {
  new URL(frontendUrl);
} catch (e) {
  console.error('Invalid URL format. Please provide a complete URL including https://');
  process.exit(1);
}

console.log(`\n🔧 Authentication Deployment Fix Tool`);
console.log(`=================================\n`);
console.log(`Frontend URL: ${frontendUrl}`);

// Environment settings
const envPath = path.join(__dirname, 'server', '.env');
if (fs.existsSync(envPath)) {
  console.log(`\n📄 Checking server .env file...`);
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  const corsOriginRegex = /CORS_ORIGIN=(.*)/;
  const corsOriginMatch = envContent.match(corsOriginRegex);
  
  if (corsOriginMatch) {
    const currentOrigins = corsOriginMatch[1];
    
    if (!currentOrigins.includes(frontendUrl)) {
      // Add the frontend URL to CORS_ORIGIN
      let newOrigins;
      if (currentOrigins.endsWith(',')) {
        newOrigins = `${currentOrigins}${frontendUrl}`;
      } else {
        newOrigins = `${currentOrigins},${frontendUrl}`;
      }
      
      envContent = envContent.replace(corsOriginRegex, `CORS_ORIGIN=${newOrigins}`);
      fs.writeFileSync(envPath, envContent);
      
      console.log(`✅ Added ${frontendUrl} to CORS_ORIGIN in .env file`);
    } else {
      console.log(`✅ Frontend URL already in CORS_ORIGIN`);
    }
  } else {
    // CORS_ORIGIN not found, add it
    envContent += `\n# Added by deployment fix script\nCORS_ORIGIN=${frontendUrl},http://localhost:5173,http://localhost:3000\n`;
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Added CORS_ORIGIN setting to .env file`);
  }
} else {
  console.log(`❌ Server .env file not found`);
}

// Check server.js for CORS configuration
const serverJsPath = path.join(__dirname, 'server', 'server.js');
if (fs.existsSync(serverJsPath)) {
  console.log(`\n📄 Checking server.js for CORS configuration...`);
  
  let serverContent = fs.readFileSync(serverJsPath, 'utf8');
  
  // Check if CORS is disabled for debugging - this is a common issue
  if (serverContent.includes('// Allow all origins during deployment debugging')) {
    console.log(`✅ CORS is already set to allow all origins for debugging`);
  } else {
    console.log(`⚠️ CORS might be restricted. Check server.js manually.`);
  }
}

console.log(`\n✅ Authentication deployment fixes applied`);
console.log(`\n🔷 Next Steps:`);
console.log(`1. Restart your backend server`);
console.log(`2. Wait 1-2 minutes for changes to take effect`);
console.log(`3. Test login/signup again from your frontend`);
console.log(`4. Check browser console and network tab for any remaining errors`);
console.log(`\n🔷 For persistent issues:`);
console.log(`1. Visit the auth status endpoint: ${frontendUrl}/api/v1/auth/status`);
console.log(`2. Check server logs for detailed authentication attempts`);
console.log(`3. Try the API diagnostic page included with your frontend`);
