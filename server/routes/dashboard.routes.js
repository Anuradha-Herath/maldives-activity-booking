const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes - require authentication
router.use(protect);

// Restrict all routes to admin role
router.use(authorize('admin'));

// Dashboard routes
router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
