const express = require('express');
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

// Add root endpoint to check if server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Maldives Activity Booking API Server',
    status: 'Running',
    endpoints: [
      '/activities',
      '/server-status',
      '/auth',
      '/bookings'
    ],
    documentation: 'API documentation coming soon'
  });
});

// Body parser
app.use(express.json());

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
      corsOriginProcessed: corsOriginValue,
      port: process.env.PORT || 5000
    }
  });
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
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // If allowedOrigins is '*', allow all origins
    if (allowedOrigins === '*') return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,
  useTempFiles: false
}));

// Add API root endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Maldives Activity Booking API',
    status: 'Running',
    version: 'v1',
    documentation: '/api/v1/server-status for more details'
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
