#!/bin/bash
# Exit on error
set -e

# Build frontend
echo "Building client..."
cd client
npm install
npm run build

# Return to root directory
cd ..

# Build backend
echo "Building server..."
cd server
npm install

echo "Build completed successfully!"
