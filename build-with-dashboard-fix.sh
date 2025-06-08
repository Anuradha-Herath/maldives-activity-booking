#!/bin/bash

# Production deployment script with dashboard refresh fix
echo "=== Building Maldives Activity Booking with dashboard refresh fix ==="

# Navigate to client directory
cd client

# Install all dependencies
echo "==> Installing dependencies..."
npm install

# Build with special flags to ensure fresh data in production
echo "==> Building for production with dashboard refresh fix..."
export VITE_ENABLE_DASHBOARD_FIX=true
export VITE_CACHE_BUSTER=true
npm run build

echo "==> Copying service worker to dist directory..."
cp public/cache-buster-sw.js dist/

echo "==> Creating cache control headers..."
cat > dist/_headers << EOL
/*
  Cache-Control: no-cache, no-store, must-revalidate

/api/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
EOL

echo "==> Build complete!"
echo "==> Deploy the contents of the dist directory to your hosting provider"
