// Deployment Readiness Check for Authentication
// Run this script to verify all authentication-related settings are correct
// before deploying to production

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.blue}Authentication Deployment Readiness Check${colors.reset}`);
console.log('===========================================');

// Track overall status
let allPassed = true;
const issuesFound = [];

// Check function
function check(title, testFn) {
  try {
    const result = testFn();
    if (result === true) {
      console.log(`${colors.green}✓ ${title}${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}✗ ${title}${colors.reset}`);
      if (typeof result === 'string') {
        console.log(`  ${colors.yellow}${result}${colors.reset}`);
        issuesFound.push({ title, issue: result });
      } else {
        issuesFound.push({ title, issue: 'Test failed' });
      }
      allPassed = false;
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ ${title} - ERROR: ${error.message}${colors.reset}`);
    issuesFound.push({ title, issue: error.message });
    allPassed = false;
    return false;
  }
}

// 1. Check backend environment variables
function checkBackendEnv() {
  const envPath = path.join(__dirname, 'server', '.env');
  if (!fs.existsSync(envPath)) {
    return 'server/.env file not found';
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'JWT_SECRET',
    'JWT_EXPIRE',
    'JWT_COOKIE_EXPIRE',
    'CORS_ORIGIN'
  ];
  
  const missingVars = requiredVars.filter(varName => !content.includes(`${varName}=`));
  
  if (missingVars.length > 0) {
    return `Missing required variables: ${missingVars.join(', ')}`;
  }
  
  // Check CORS_ORIGIN setting
  const corsMatch = content.match(/CORS_ORIGIN=([^\n]+)/);
  if (corsMatch) {
    const corsValue = corsMatch[1];
    if (!corsValue.includes('https://') && corsValue !== '*') {
      return 'CORS_ORIGIN should include HTTPS production URLs';
    }
  }
  
  return true;
}

// 2. Check frontend environment variables
function checkFrontendEnv() {
  const envPath = path.join(__dirname, 'client', '.env.production');
  if (!fs.existsSync(envPath)) {
    return 'client/.env.production file not found';
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  
  // Check API URL
  const apiUrlMatch = content.match(/VITE_API_URL=([^\n]+)/);
  if (!apiUrlMatch) {
    return 'VITE_API_URL not found in .env.production';
  }
  
  const apiUrl = apiUrlMatch[1];
  if (apiUrl.startsWith('VITE_API_URL=')) {
    return 'VITE_API_URL contains variable name in the value';
  }
  
  if (!apiUrl.startsWith('https://')) {
    return 'VITE_API_URL should use HTTPS in production';
  }
  
  if (!apiUrl.includes('/api/v1')) {
    return 'VITE_API_URL should include /api/v1 path';
  }
  
  return true;
}

// 3. Check CORS configuration
function checkCorsConfig() {
  const serverJsPath = path.join(__dirname, 'server', 'server.js');
  if (!fs.existsSync(serverJsPath)) {
    return 'server/server.js file not found';
  }
  
  const content = fs.readFileSync(serverJsPath, 'utf8');
  
  if (!content.includes('credentials: true')) {
    return 'CORS configuration missing credentials: true';
  }
  
  return true;
}

// 4. Check cookie settings
function checkCookieSettings() {
  const authControllerPath = path.join(__dirname, 'server', 'controllers', 'auth.controller.js');
  if (!fs.existsSync(authControllerPath)) {
    return 'auth.controller.js file not found';
  }
  
  const content = fs.readFileSync(authControllerPath, 'utf8');
  
  if (!content.includes('options.secure = true')) {
    return 'Cookie secure flag not set for production';
  }
  
  if (!content.includes('sameSite: \'none\'')) {
    return 'Cookie sameSite not set to none for cross-site requests';
  }
  
  return true;
}

// 5. Check authentication middleware
function checkAuthMiddleware() {
  const authMiddlewarePath = path.join(__dirname, 'server', 'middleware', 'auth.js');
  if (!fs.existsSync(authMiddlewarePath)) {
    return 'auth.js middleware file not found';
  }
  
  const content = fs.readFileSync(authMiddlewarePath, 'utf8');
  
  // Check if middleware checks both header and cookie
  const checksBothAuthMethods = 
    content.includes('req.headers.authorization') && 
    content.includes('req.cookies.token');
  
  if (!checksBothAuthMethods) {
    return 'Auth middleware should check both header and cookie for token';
  }
  
  return true;
}

// 6. Check frontend authentication handling
function checkFrontendAuth() {
  const authServicePath = path.join(__dirname, 'client', 'src', 'services', 'authService.js');
  if (!fs.existsSync(authServicePath)) {
    return 'authService.js file not found';
  }
  
  const content = fs.readFileSync(authServicePath, 'utf8');
  
  if (!content.includes('withCredentials: true') && 
      !content.includes('axios.defaults.withCredentials = true')) {
    return 'API requests missing withCredentials: true settings';
  }
  
  if (!content.includes('localStorage.setItem')) {
    return 'Token not being stored in localStorage';
  }
  
  if (!content.includes('Authorization') && !content.includes('authorization')) {
    return 'Authorization header might not be set for requests';
  }
  
  return true;
}

// Run checks
console.log(`\n${colors.cyan}Running backend checks:${colors.reset}`);
check('Backend environment variables', checkBackendEnv);
check('CORS configuration', checkCorsConfig);
check('Cookie settings', checkCookieSettings);
check('Auth middleware', checkAuthMiddleware);

console.log(`\n${colors.cyan}Running frontend checks:${colors.reset}`);
check('Frontend environment variables', checkFrontendEnv);
check('Frontend authentication handling', checkFrontendAuth);

// Show summary
console.log('\n===========================================');
if (allPassed) {
  console.log(`${colors.green}${colors.bright}All checks passed! Your authentication configuration is ready for deployment.${colors.reset}`);
  console.log(`\nNext steps:`);
  console.log(`1. Deploy your backend: npm run deploy:backend`);
  console.log(`2. Deploy your frontend: npm run deploy:frontend`);
  console.log(`3. Run verification: node verify-auth-deployment.js`);
} else {
  console.log(`${colors.red}${colors.bright}Some checks failed. Please fix the issues before deploying:${colors.reset}`);
  
  issuesFound.forEach((issue, index) => {
    console.log(`\n${colors.yellow}${index + 1}. Issue with: ${issue.title}${colors.reset}`);
    console.log(`   ${issue.issue}`);
  });
  
  console.log(`\nRun the fix script to attempt automatic repairs:`);
  console.log(`> node fix-backend-deployment.js`);
  console.log(`> node client/fix-env-vars.js`);
}

console.log('\n===========================================');
