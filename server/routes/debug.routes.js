const express = require('express');
const router = express.Router();
const debugController = require('../controllers/debugController');

// Route to test Cloudinary connection
router.get('/cloudinary', debugController.testCloudinary);

module.exports = router;
