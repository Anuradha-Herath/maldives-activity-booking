#!/usr/bin/env node

/**
 * Environment Variable Fix Script for Deployment
 * 
 * This script helps diagnose and fix common environment variable issues
 * in deployed Vite applications. It can be run on your deployment platform
 * using their console/terminal features.
 */

// Collect environment information
const info = {
  platform: process.platform,
  nodejs: process.version,
  env: process.env,
  envKeys: Object.keys(process.env).filter(key => key.startsWith('VITE_'))
};

console.log('=== Environment Variables Diagnostic ===');
console.log(`Node.js Version: ${info.nodejs}`);
console.log(`Platform: ${info.platform}`);
console.log('\nVite Environment Variables:');

// Check for common issues with environment variables
if (info.envKeys.length === 0) {
  console.log('❌ No Vite environment variables found!');
  console.log('   Make sure you have set them in your deployment platform.');
} else {
  info.envKeys.forEach(key => {
    const value = process.env[key];
    console.log(`- ${key}: ${value}`);

    // Check for common issues
    if (typeof value === 'string') {
      if (value.startsWith(`${key}=`)) {
        console.log(`  ❌ ERROR: Value includes variable name (${key}=)`);
        console.log(`  ✅ CORRECT FORMAT: ${value.replace(`${key}=`, '')}`);
      } else if (value.includes('/api/v1/api/v1')) {
        console.log(`  ❌ ERROR: Duplicated API path (/api/v1/api/v1)`);
        console.log(`  ✅ CORRECT FORMAT: ${value.replace('/api/v1/api/v1', '/api/v1')}`);
      } else {
        console.log('  ✅ Format looks good');
      }
    }
  });
}

console.log('\n=== API URL Validation ===');
const apiUrl = process.env.VITE_API_URL;

if (apiUrl) {
  console.log(`API URL: ${apiUrl}`);
  
  try {
    // Basic validation of URL
    new URL(apiUrl);
    console.log('✅ URL format is valid');
  } catch (e) {
    console.log('❌ Invalid URL format');
    
    // Try to fix common URL format issues
    if (apiUrl.startsWith('VITE_API_URL=')) {
      const fixedUrl = apiUrl.replace('VITE_API_URL=', '');
      console.log(`Suggested fix: ${fixedUrl}`);
    }
  }
} else {
  console.log('❌ API URL not defined!');
}

console.log('\n=== Deployment Platform Instructions ===');
console.log('To fix environment variables, update them in your deployment platform:');
console.log('1. Netlify: Go to Site settings > Build & deploy > Environment');
console.log('2. Vercel: Go to Project settings > Environment Variables');
console.log('3. Render: Go to Dashboard > Your service > Environment');
console.log('\nMake sure environment variables DO NOT include their names in the values');
console.log('Example of INCORRECT format:');
console.log('  VITE_API_URL=VITE_API_URL=https://api.example.com');
console.log('Example of CORRECT format:');
console.log('  VITE_API_URL=https://api.example.com');
