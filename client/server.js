// Simple Express server to serve the static files with correct MIME types
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import mimeTypes from './mime-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4173;

// Disable X-Powered-By header
app.disable('x-powered-by');

// Log server startup information
console.log('Starting server with correct MIME types...');
console.log('__dirname:', __dirname);
console.log('Node version:', process.version);

// Add security headers middleware
app.use((req, res, next) => {
  // Add X-Content-Type-Options header to prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Add other security headers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Remove Expires header from responses, as we're using Cache-Control
  res.removeHeader('Expires');
  
  next();
});

// Set correct MIME types for all requests
app.use((req, res, next) => {
  const ext = path.extname(req.path);
  if (mimeTypes[ext]) {
    res.type(mimeTypes[ext]);
  }
  next();
});

// Serve static files with proper MIME types and cache headers
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.css') {
      res.setHeader('Content-Type', 'text/css');
    } else if (ext === '.js') {
      res.setHeader('Content-Type', 'application/javascript');
    }
    
    // Add aggressive cache headers for static assets
    if (['.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // For HTML and other dynamic files, use a shorter cache time
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Specific handler for index.css to force correct MIME type
app.get('/index.css', (req, res) => {
  console.log('Request received for /index.css - redirecting to main.css');
  
  // Redirect to the actual CSS file that was generated
  res.redirect('/assets/css/main.css');
});

// Handle main.css with proper MIME type
app.get('/assets/css/main.css', (req, res) => {
  console.log('Serving main.css with forced MIME type text/css');
  
  const cssPath = path.join(__dirname, 'dist', 'assets', 'css', 'main.css');
  
  if (fs.existsSync(cssPath)) {
    console.log(`Found main.css at: ${cssPath}`);
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for a year
    fs.createReadStream(cssPath).pipe(res);
  } else {
    console.log(`CSS file not found at: ${cssPath}`);
    res.status(404).send('CSS file not found');
  }
});

// For all other requests, send the index.html file
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
