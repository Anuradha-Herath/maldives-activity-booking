#!/bin/bash
# Exit on error
set -e

# Build frontend
echo "Building client..."
cd client
npm install
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
