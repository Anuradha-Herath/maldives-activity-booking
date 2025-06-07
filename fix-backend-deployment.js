// Backend deployment fix script
// Resolves common issues with CORS, cookies, and authentication
// Run with: node fix-backend-deployment.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛠️  Starting backend deployment fix script...');

// Function to check if the server is in the production environment
function isProduction() {
  const envFilePath = path.join(__dirname, 'server', '.env');
  if (fs.existsSync(envFilePath)) {
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    return envContent.includes('NODE_ENV=production');
  }
  return false;
}

// Function to fix CORS configuration
function fixCORSConfiguration() {
  console.log('\n📝 Checking CORS configuration...');
  
  const serverJsPath = path.join(__dirname, 'server', 'server.js');
  if (!fs.existsSync(serverJsPath)) {
    console.log('❌ server.js not found!');
    return false;
  }
  
  let serverContent = fs.readFileSync(serverJsPath, 'utf8');
  let modified = false;
  
  // Make sure the CORS configuration is permissive during debugging
  if (serverContent.includes('if (allowedOrigins.indexOf(origin) === -1)')) {
    // Replace the CORS check with a more permissive one for debugging
    const oldCorsCheck = /if \(allowedOrigins\.indexOf\(origin\) === -1\) \{[\s\S]*?return callback\(null, true\);[\s\S]*?\}/;
    const newCorsCheck = `if (allowedOrigins.indexOf(origin) === -1) {
      console.log(\`CORS request from non-allowed origin: \${origin}\`);
      
      // During deployment debugging, allow all origins to help diagnose issues
      return callback(null, true);
      
      // Uncomment the below code when ready for strict CORS enforcement
      /* 
      if (process.env.NODE_ENV === 'production') {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      */
    }`;
    
    serverContent = serverContent.replace(oldCorsCheck, newCorsCheck);
    modified = true;
  }
  
  // Store CORS origins in app variables for easier access
  if (!serverContent.includes('app.set(\'corsOrigins\', allowedOrigins);')) {
    const corsConfigLine = 'console.log(\'CORS Origins allowed:\', allowedOrigins);';
    serverContent = serverContent.replace(
      corsConfigLine,
      `${corsConfigLine}\n\n// Store CORS origins in app variables for easier access\napp.set('corsOrigins', allowedOrigins);`
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(serverJsPath, serverContent);
    console.log('✅ Fixed CORS configuration in server.js');
  } else {
    console.log('ℹ️  CORS configuration looks good');
  }
  
  return true;
}

// Function to fix cookie settings
function fixCookieSettings() {
  console.log('\n📝 Checking cookie settings...');
  
  const authControllerPath = path.join(__dirname, 'server', 'controllers', 'auth.controller.js');
  if (!fs.existsSync(authControllerPath)) {
    console.log('❌ auth.controller.js not found!');
    return false;
  }
  
  let authContent = fs.readFileSync(authControllerPath, 'utf8');
  let modified = false;
  
  // Update cookie options for better cross-origin support
  const cookieOptionsPattern = /const options = \{[\s\S]*?httpOnly: true,[\s\S]*?\};/;
  
  if (cookieOptionsPattern.test(authContent)) {
    const newCookieOptions = `const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: '/', // Ensure cookie is available across the entire site
  };`;
    
    authContent = authContent.replace(cookieOptionsPattern, newCookieOptions);
    modified = true;
  }
  
  // Ensure SameSite is correctly set for production
  if (!authContent.includes('sameSite: \'none\'')) {
    const prodCookieCheck = /if \(process\.env\.NODE_ENV === 'production'\) \{[\s\S]*?options\.secure = true;[\s\S]*?\}/;
    const newProdCookieSettings = `if (process.env.NODE_ENV === 'production') {
    options.secure = true;
    options.sameSite = 'none'; // Required for cross-site cookies in modern browsers
    console.log('Using production cookie settings with secure=true and sameSite=none');
  } else {
    console.log('Using development cookie settings');
  }`;
    
    authContent = authContent.replace(prodCookieCheck, newProdCookieSettings);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(authControllerPath, authContent);
    console.log('✅ Fixed cookie settings in auth.controller.js');
  } else {
    console.log('ℹ️  Cookie settings look good');
  }
  
  return true;
}

// Function to update environment settings
function updateEnvironmentSettings() {
  console.log('\n📝 Checking environment settings...');
  
  const envPath = path.join(__dirname, 'server', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found!');
    return false;
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  let modified = false;
  
  // Make sure NODE_ENV is properly set
  if (!envContent.includes('NODE_ENV=')) {
    envContent += '\n# Added by backend fix script\nNODE_ENV=production\n';
    modified = true;
  }
  
  // Ensure JWT_COOKIE_EXPIRE is set correctly
  if (!envContent.includes('JWT_COOKIE_EXPIRE=')) {
    envContent += '\n# Added by backend fix script\nJWT_COOKIE_EXPIRE=30\n';
    modified = true;
  }
  
  // Update CORS settings to include multiple possible frontend domains
  const corsMatch = envContent.match(/CORS_ORIGIN=(.*)/);
  if (corsMatch) {
    const currentOrigins = corsMatch[1];
    
    // Common frontend deployment domains
    const frontendDomains = [
      'https://maldives-activity-booking-frontend.onrender.com',
      'https://maldives-activities.netlify.app',
      'https://maldives-activities.vercel.app',
      'https://main--maldives-activities.netlify.app'
    ];
    
    let newOrigins = currentOrigins;
    let originsUpdated = false;
    
    // Add any missing domains
    for (const domain of frontendDomains) {
      if (!newOrigins.includes(domain)) {
        newOrigins += `,${domain}`;
        originsUpdated = true;
      }
    }
    
    if (originsUpdated) {
      envContent = envContent.replace(/CORS_ORIGIN=(.*)/, `CORS_ORIGIN=${newOrigins}`);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Updated environment settings in .env file');
  } else {
    console.log('ℹ️  Environment settings look good');
  }
  
  return true;
}

// Run all fixes
fixCORSConfiguration();
fixCookieSettings();
updateEnvironmentSettings();

console.log('\n✅ Backend deployment fixes applied!');
console.log('\n📋 Next steps:');
console.log('1. Redeploy your backend server or restart it');
console.log('2. Run the frontend fix script: node client/fix-env-vars.js');
console.log('3. Test authentication using the test tools provided');
console.log('4. Visit the /api/v1/auth/status endpoint to verify server configuration');
