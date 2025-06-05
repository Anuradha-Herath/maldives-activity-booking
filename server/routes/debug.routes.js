const express = require('express');
const router = express.Router();
const debugController = require('../controllers/debugController');

// @route   GET /api/v1/debug/connection
// @desc    Test API connection
// @access  Public
router.get('/connection', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API connection successful',
    timestamp: new Date(),
    headers: req.headers,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route to test Cloudinary connection
router.get('/cloudinary', debugController.testCloudinary);

// Add CORS test
router.get('/cors', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CORS check successful',
    corsSettings: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['Not configured'],
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

module.exports = router;
