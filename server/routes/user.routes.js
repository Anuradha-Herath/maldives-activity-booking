const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes - require authentication
router.use(protect);

// Restrict all routes to admin role
router.use(authorize('admin'));

// User routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.put('/:id/role', userController.updateUserRole);
router.delete('/:id', userController.deleteUser);
router.get('/:id/bookings/count', userController.getUserBookingCount);

module.exports = router;
