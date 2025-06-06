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

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
// Read allowed origins from environment variable or use defaults
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,
  useTempFiles: false
}));

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
  
  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
