const express = require('express');
const router = express.Router();
const userBookingController = require('../controllers/userBookingController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Get all user bookings
router.get('/', userBookingController.getUserBookings);

// Get user booking history
router.get('/history', userBookingController.getUserBookingHistory);

// Get upcoming bookings
router.get('/upcoming', userBookingController.getUpcomingBookings);

// Get booking stats
router.get('/stats', userBookingController.getUserBookingStats);

// Cancel a booking
router.put('/:id/cancel', userBookingController.cancelBooking);

module.exports = router;
