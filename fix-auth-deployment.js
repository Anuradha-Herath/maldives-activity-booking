// Deployment environment fix script
// Run with: node fix-auth-deployment.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

// Configuration
const BACKEND_URL = process.argv[2] || 'https://maldives-activity-booking-backend.onrender.com';
const FRONTEND_URL = process.argv[3] || 'https://maldives-activities.netlify.app';

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Logger
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m', // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m' // Reset
  };
  
  console.log(`${colors[type]}${type.toUpperCase()}: ${message}${colors.reset}`);
}

// Check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Fix backend CORS configuration
async function fixBackendCors() {
  log('Checking backend CORS configuration...');
  
  const serverFilePath = path.join(__dirname, 'server/server.js');
  if (!fileExists(serverFilePath)) {
    log('server.js not found. Make sure you run this script from the project root.', 'error');
    return false;
  }
  
  try {
    let serverContent = fs.readFileSync(serverFilePath, 'utf8');
    
    // Update allowed origins to include deployment URLs
    if (serverContent.includes('const allowedOrigins')) {
      const corsPattern = /(const allowedOrigins\s*=\s*[^;]*)(;)/;
      
      // Ensure deployed frontend URL is included
      if (!serverContent.includes(FRONTEND_URL)) {
        // If existing array, add to it
        const match = serverContent.match(corsPattern);
        if (match) {
          if (match[1].includes('[')) {
            // It's an array, append to it
            const updatedOrigins = match[1].replace(/]$/, `, '${FRONTEND_URL}']`);
            serverContent = serverContent.replace(corsPattern, `${updatedOrigins};`);
          } else {
            // It's a single value or variable, make it an array
            serverContent = serverContent.replace(
              corsPattern, 
              `const allowedOrigins = ['${FRONTEND_URL}', ${match[1].replace('const allowedOrigins =', '')}];`
            );
          }
          
          fs.writeFileSync(serverFilePath, serverContent);
          log(`Added ${FRONTEND_URL} to allowed CORS origins`, 'success');
        }
      } else {
        log('CORS configuration already includes the frontend URL', 'success');
      }
    }
    
    return true;
  } catch (err) {
    log(`Error fixing CORS configuration: ${err.message}`, 'error');
    return false;
  }
}

// Fix environment variables
async function fixEnvironmentVariables() {
  log('Checking environment variables...');
  
  // Check frontend .env.production
  const envPath = path.join(__dirname, 'client/.env.production');
  const envLocalPath = path.join(__dirname, 'client/.env.local');
  
  try {
    // Create or update .env.production
    const envContent = `VITE_API_URL=${BACKEND_URL}/api/v1\n`;
    fs.writeFileSync(envPath, envContent);
    log(`Updated ${envPath} with API URL: ${BACKEND_URL}/api/v1`, 'success');
    
    // Also create .env.local for local development
    if (!fileExists(envLocalPath)) {
      fs.writeFileSync(envLocalPath, `VITE_API_URL=http://localhost:5000/api/v1\n`);
      log(`Created ${envLocalPath} for local development`, 'success');
    }
    
    return true;
  } catch (err) {
    log(`Error fixing environment variables: ${err.message}`, 'error');
    return false;
  }
}

// Fix backend cookie settings
async function fixCookieSettings() {
  log('Checking cookie settings...');
  
  const authControllerPath = path.join(__dirname, 'server/controllers/auth.controller.js');
  if (!fileExists(authControllerPath)) {
    log('auth.controller.js not found', 'error');
    return false;
  }
  
  try {
    let authContent = fs.readFileSync(authControllerPath, 'utf8');
    
    // Find and update cookie options
    if (authContent.includes('options.secure = true')) {
      if (!authContent.includes('options.sameSite = \'none\'')) {
        // Add sameSite configuration
        authContent = authContent.replace(
          'options.secure = true;', 
          'options.secure = true;\n    options.sameSite = \'none\'; // Required for cross-site cookies in modern browsers'
        );
        
        fs.writeFileSync(authControllerPath, authContent);
        log('Added sameSite=none configuration to cookies', 'success');
      } else {
        log('Cookie settings already properly configured', 'success');
      }
    }
    
    return true;
  } catch (err) {
    log(`Error fixing cookie settings: ${err.message}`, 'error');
    return false;
  }
}

// Run test script
async function runTests() {
  log('Running authentication tests...');
  
  const testCommand = `node auth-test.js ${BACKEND_URL} test@example.com password123`;
  
  return new Promise((resolve) => {
    exec(testCommand, (error, stdout, stderr) => {
      console.log('\n--- TEST RESULTS ---');
      console.log(stdout);
      
      if (stderr) {
        console.error(stderr);
      }
      
      if (error) {
        log(`Tests completed with errors. Exit code: ${error.code}`, 'warning');
      } else {
        log('Tests completed successfully', 'success');
      }
      
      resolve(!error);
    });
  });
}

// Main function
async function main() {
  log('============================================');
  log('AUTHENTICATION DEPLOYMENT FIX SCRIPT');
  log('============================================');
  log(`Backend URL: ${BACKEND_URL}`);
  log(`Frontend URL: ${FRONTEND_URL}`);
  log('============================================\n');
  
  // Fix CORS
  const corsFixed = await fixBackendCors();
  
  // Fix environment variables
  const envFixed = await fixEnvironmentVariables();
  
  // Fix cookie settings
  const cookieFixed = await fixCookieSettings();
  
  log('\n============================================');
  log('FIX SUMMARY:');
  log('============================================');
  log(`CORS Configuration: ${corsFixed ? 'FIXED/VERIFIED ✅' : 'FAILED ❌'}`);
  log(`Environment Variables: ${envFixed ? 'FIXED/VERIFIED ✅' : 'FAILED ❌'}`);
  log(`Cookie Settings: ${cookieFixed ? 'FIXED/VERIFIED ✅' : 'FAILED ❌'}`);
  
  // Ask if user wants to run tests
  rl.question('\nDo you want to run authentication tests? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      await runTests();
    }
    
    log('\n============================================');
    log('NEXT STEPS:');
    log('============================================');
    log('1. Rebuild and redeploy the frontend application');
    log('2. Restart the backend server');
    log('3. Test authentication at ' + FRONTEND_URL);
    log('4. Open the browser console to check for any remaining errors');
    log('5. Use the api-connection-test.html page to diagnose any issues');
    log('============================================');
    
    rl.close();
  });
}

main().catch(error => {
  log(`Unexpected error: ${error.message}`, 'error');
  process.exit(1);
});
