const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to create a booking
router.post('/', bookingController.createBooking);

// Route to get all bookings (admin only)
router.get('/', bookingController.getAllBookings);

// Route to get booking by reference number
router.get('/reference/:reference', bookingController.getBookingByReference);

// Route to get, update or delete a booking by ID
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
