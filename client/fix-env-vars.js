// This script fixes common deployment environment variable issues
// Run before build: node fix-env-vars.js

const fs = require('fs');
const path = require('path');

// Get environment variables from .env files
function fixEnvFiles() {
  const envFiles = [
    '.env.production',
    '.env',
    '.env.local'
  ];
  
  console.log('Checking environment variable files for issues...');
  
  envFiles.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    
    if (fs.existsSync(filePath)) {
      console.log(`Fixing ${fileName}...`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Fix case where variable name is duplicated: VITE_API_URL=VITE_API_URL=value
      if (content.match(/VITE_API_URL=VITE_API_URL=/)) {
        content = content.replace(/VITE_API_URL=VITE_API_URL=/, 'VITE_API_URL=');
        modified = true;
      }
      
      // Fix API path duplication: /api/v1/api/v1
      if (content.includes('/api/v1/api/v1')) {
        content = content.replace(/\/api\/v1\/api\/v1/g, '/api/v1');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed issues in ${fileName}`);
      } else {
        console.log(`✓ No issues found in ${fileName}`);
      }
    }
  });
}

// Fix Netlify environment variables reference file if it exists
function fixNetlifyEnv() {
  const netlifyEnvPath = path.join(__dirname, 'netlify.toml');
  
  if (fs.existsSync(netlifyEnvPath)) {
    console.log('Checking Netlify configuration...');
    
    let content = fs.readFileSync(netlifyEnvPath, 'utf8');
    let modified = false;
    
    // Check for environment variable format issues in netlify.toml
    const envVarPattern = /VITE_API_URL\s*=\s*"(.+?)"/g;
    const matches = [...content.matchAll(envVarPattern)];
    
    for (const match of matches) {
      const value = match[1];
      
      if (value.startsWith('VITE_API_URL=')) {
        const fixedValue = value.replace('VITE_API_URL=', '');
        content = content.replace(match[0], `VITE_API_URL = "${fixedValue}"`);
        modified = true;
      }
      
      if (value.includes('/api/v1/api/v1')) {
        const fixedValue = value.replace('/api/v1/api/v1', '/api/v1');
        content = content.replace(match[0], `VITE_API_URL = "${fixedValue}"`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(netlifyEnvPath, content);
      console.log('✅ Fixed Netlify environment variables');
    } else {
      console.log('✓ Netlify configuration looks good');
    }
  }
}

// Update package.json to include this fix in build process
function updatePackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Check if build script exists
    if (packageJson.scripts && packageJson.scripts.build) {
      // Only add if not already there
      if (!packageJson.scripts.build.includes('fix-env-vars.js')) {
        // Add the fix script before the build command
        packageJson.scripts.build = `node fix-env-vars.js && ${packageJson.scripts.build}`;
        
        // Add a prebuild script as an alternative approach
        if (!packageJson.scripts.prebuild) {
          packageJson.scripts.prebuild = 'node fix-env-vars.js';
        }
        
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Updated package.json to include environment variable fixes in build process');
      } else {
        console.log('✓ Build script already includes fix-env-vars.js');
      }
    }
  }
}

console.log('🔧 Running environment variable fix script...');
fixEnvFiles();
fixNetlifyEnv();
updatePackageJson();
console.log('✅ Environment variable fixes completed');
