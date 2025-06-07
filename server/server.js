const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const activityRoutes = require('./routes/activity.routes');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
const testUploadRoutes = require('./routes/testUpload.routes');
const bookingRoutes = require('./routes/booking.routes');
const userRoutes = require('./routes/user.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userBookingRoutes = require('./routes/userBooking.routes');

const app = express();

// Disable X-Powered-By header
app.disable('x-powered-by');

// Add security headers middleware
app.use((req, res, next) => {
  // Add X-Content-Type-Options header to prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Add other security headers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  next();
});

// Body parser
app.use(express.json());

// Add cache-control middleware for API endpoints
app.use((req, res, next) => {
  // For API endpoints, set proper cache headers 
  // For GET requests to /api/v1/activities, cache for 5 minutes
  if (req.method === 'GET' && req.url.match(/^\/api\/v1\/activities/)) {
    res.setHeader('Cache-Control', 'public, max-age=300');  } else {
    // For other API endpoints (especially those that modify data), don't cache
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    // Remove Expires header as Cache-Control is preferred
  }
  next();
});

// Enable CORS
// Read allowed origins from environment variable or use defaults
// Handle case where CORS_ORIGIN might include the key name (Render deployment issue)
let corsOriginValue = process.env.CORS_ORIGIN;
if (corsOriginValue && corsOriginValue.startsWith('CORS_ORIGIN=')) {
  corsOriginValue = corsOriginValue.replace('CORS_ORIGIN=', '');
}

const allowedOrigins = corsOriginValue 
  ? (corsOriginValue === '*' ? '*' : corsOriginValue.split(',').map(origin => origin.trim()))
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://maldives-activity-booking-frontend.onrender.com'];

// Diagnostic root endpoint to check if the server is running
app.get('/server-status', (req, res) => {
  res.redirect('/api/v1/server-status');
});

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log('CORS Origins allowed:', allowedOrigins);

// Use CORS middleware with proper configuration
app.use(cors({
  origin: function(origin, callback) {
    // Log every origin request for debugging
    console.log(`CORS request from origin: ${origin || 'No origin (direct request)'}`);
    
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // If allowedOrigins is '*', allow all origins
    if (allowedOrigins === '*') {
      console.log('CORS: Allowing all origins due to wildcard configuration');
      return callback(null, true);
    }
    
    // Check if origin is in the allowed origins list
    if (Array.isArray(allowedOrigins) && allowedOrigins.indexOf(origin) === -1) {
      console.log(`CORS request from non-allowed origin: ${origin}`);
      console.log(`Configured allowed origins: ${allowedOrigins.join(', ')}`);
      
      // For production, accept unknown origins for now to help diagnose issues
      // This is more permissive but helps diagnose deployment issues
      console.log('CORS: Allowing request despite origin mismatch (debugging mode)');
      return callback(null, true);
      
      // Once everything is working, you can enable strict CORS by uncommenting below:
      // if (process.env.NODE_ENV === 'production') {
      //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      //   return callback(new Error(msg), false);
      // }
    }
    
    // Origin is allowed
    console.log(`CORS: Origin ${origin} is allowed`);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  exposedHeaders: ['set-cookie']
}));

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,
  useTempFiles: false
}));

// Add API root endpoint
// Add root endpoint to check if server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Maldives Activity Booking API Server',
    status: 'Running',
    endpoints: [
      '/api/v1/activities',
      '/api/v1/server-status',
      '/api/v1/auth',
      '/api/v1/bookings'
    ],
    documentation: 'API documentation coming soon'
  });
});

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Maldives Activity Booking API',
    status: 'Running',
    version: 'v1',
    documentation: '/api/v1/server-status for more details'
  });
});

// Diagnostic endpoint for CORS and authentication testing
app.get('/api/v1/test-connection', (req, res) => {
  // Extract token if present
  let token;
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  
  // Detailed connection information
  res.json({
    success: true,
    message: 'Connection successful',
    server: {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    },
    request: {
      origin: req.headers.origin || 'No origin header',
      referer: req.headers.referer || 'No referer',
      userAgent: req.headers['user-agent'],
      contentType: req.headers['content-type'],
      cookies: req.cookies ? Object.keys(req.cookies) : [],
      hasAuthorizationHeader: !!authHeader,
      hasToken: !!token
    },
    cors: {
      configuredOrigins: Array.isArray(allowedOrigins) ? allowedOrigins : 'Wildcard (*)'
    }
  });
});

// Add server status endpoint
app.get('/api/v1/server-status', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    cors: {
      allowedOrigins,
      requestOrigin: req.headers.origin || 'No origin in request'
    },
    env: {
      nodeEnv: process.env.NODE_ENV,
      corsOriginRaw: process.env.CORS_ORIGIN,
      port: process.env.PORT || 5000
    }
  });
});

// Debug middleware to log file uploads
app.use((req, res, next) => {
  if (req.files) {
    console.log('Files uploaded:', Object.keys(req.files));
  }
  next();
});

// Mount routers
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/test-upload', testUploadRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/user/bookings', userBookingRoutes);

// Add debug routes in non-production environments
if (process.env.NODE_ENV !== 'production') {
  const debugRoutes = require('./routes/debug.routes');
  app.use('/api/v1/debug', debugRoutes);
}

// Handle 404 errors - Route not found
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Get origin from request headers
  const origin = req.headers.origin;
  
  // Set CORS headers in error responses if the origin is allowed
  if (origin && allowedOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Maldives Activity Booking Server...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🌐 Port: ${PORT}`);
console.log(`🔗 Database: ${process.env.MONGODB_URI ? 'Configured' : 'NOT CONFIGURED'}`);
console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'NOT CONFIGURED'}`);
console.log(`☁️ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'NOT CONFIGURED'}`);

const server = app.listen(
  PORT,
  () => {
    console.log(`✅ Server successfully running on port ${PORT}`);
    console.log(`🌍 Server URL: ${process.env.NODE_ENV === 'production' ? 'https://maldives-activity-booking-backend.onrender.com' : `http://localhost:${PORT}`}`);
  }
);

// Handle server startup errors
server.on('error', (error) => {
  console.error('❌ Server startup error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
