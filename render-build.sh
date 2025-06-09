#!/bin/bash
# Exit on error
set -e

# Build frontend
echo "Building client..."
cd client
npm install
# Add dependencies for validation script if they don't exist
npm install --save-dev glob chalk esbuild
# Verify JSX syntax before building
echo "Verifying JSX syntax..."
mkdir -p scripts
cat > scripts/verify-jsx.js << 'EOF'
/**
 * JSX Syntax Verification Script
 * 
 * This script checks for common JSX syntax errors in React components
 * by attempting to parse them using esbuild.
 */

import { glob } from 'glob';
import { build } from 'esbuild';
import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.blue('🔍 Starting JSX syntax verification...'));

// Find all JSX files
const jsxFiles = await glob('src/**/*.jsx');
console.log(chalk.gray(`Found ${jsxFiles.length} JSX files to check`));

let hasErrors = false;

// Check each file individually to provide better error messages
for (const file of jsxFiles) {
  try {
    // Try to build it with esbuild
    await build({
      entryPoints: [file],
      write: false,
      bundle: false,
      logLevel: 'silent',
      format: 'esm',
    });
    
    console.log(chalk.green(`✓ ${file} - No syntax errors`));
  } catch (error) {
    console.log(chalk.red(`✗ ${file} - Syntax error:`));
    console.log(chalk.yellow(error.message));
    hasErrors = true;
  }
}

if (hasErrors) {
  console.log(chalk.red('❌ JSX verification failed. Please fix the errors above before deploying.'));
  process.exit(1);
} else {
  console.log(chalk.green('✅ All JSX files passed syntax verification!'));
}
EOF

echo "Running JSX verification..."
node scripts/verify-jsx.js

# Build the client
npm run build

# Create index.css that imports the real CSS file
echo "Creating index.css symlink and headers..."
echo '/* Redirect to actual CSS file */
@import url("/assets/css/main.css");' > dist/index.css

# Set proper MIME types in _headers
echo '/*.css
  Content-Type: text/css
/*.js
  Content-Type: application/javascript' > dist/_headers

# Return to root directory
cd ..

# Build backend
echo "Building server..."
cd server
npm install

echo "Build completed successfully!"
