const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get all bookings for the logged-in user
// @route   GET /api/v1/user/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    // For your reference, fetch ALL user bookings regardless of status
    const bookings = await Booking.find({ email: req.user.email })
      .populate('activity')
      .sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user's past bookings (completed or cancelled bookings with past dates)
// @route   GET /api/v1/user/bookings/history
// @access  Private
exports.getUserBookingHistory = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First, automatically mark past confirmed bookings as completed
    await Booking.updateMany(
      {
        email: req.user.email,
        status: 'confirmed',
        date: { $lt: today }
      },
      { status: 'completed' }
    );

    // Then fetch all completed, cancelled, or past bookings
    const bookings = await Booking.find({
      email: req.user.email,
      $or: [
        { status: 'completed' },
        { status: 'cancelled' },
        { date: { $lt: today } }
      ]
    })
    .populate('activity')
    .sort({ date: -1 });
    
    console.log(`Found ${bookings.length} history bookings for user ${req.user.email}`);
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error('Error fetching user booking history:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user's upcoming bookings (confirmed or pending bookings with future dates)
// @route   GET /api/v1/user/bookings/upcoming
// @access  Private
exports.getUpcomingBookings = async (req, res) => {
  try {
    console.log(`Fetching upcoming bookings for user: ${req.user.email}`);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({
      email: req.user.email,
      status: { $in: ['confirmed', 'pending'] },
      date: { $gte: today }
    })
    .populate('activity')
    .sort({ date: 1 });
    
    console.log(`Found ${bookings.length} upcoming bookings for user ${req.user.email}`);
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error('Error in getUpcomingBookings:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user booking stats (count of different booking statuses)
// @route   GET /api/v1/user/bookings/stats
// @access  Private
exports.getUserBookingStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalBookings = await Booking.countDocuments({ email: req.user.email });
    const pendingBookings = await Booking.countDocuments({ 
      email: req.user.email,
      status: 'pending',
      date: { $gte: today }
    });
    const confirmedBookings = await Booking.countDocuments({ 
      email: req.user.email,
      status: 'confirmed',
      date: { $gte: today }
    });
    const completedBookings = await Booking.countDocuments({ 
      email: req.user.email,
      status: 'completed'
    });
    const cancelledBookings = await Booking.countDocuments({ 
      email: req.user.email,
      status: 'cancelled'
    });
    
    // Get recent bookings
    const recentBookings = await Booking.find({
      email: req.user.email,
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('activity');
    
    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        recentBookings
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Cancel a user's booking
// @route   PUT /api/v1/user/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Check if booking belongs to the user
    if (booking.email !== req.user.email) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to cancel this booking'
      });
    }
    
    // Check if booking is not already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled'
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();

    // Get updated booking with populated activity data
    const updatedBooking = await Booking.findById(req.params.id).populate('activity');
    
    res.status(200).json({
      success: true,
      data: updatedBooking
    });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user's latest booking (most recently created)
// @route   GET /api/v1/user/bookings/latest
// @access  Private
exports.getLatestBooking = async (req, res) => {
  try {
    console.log(`Fetching latest booking for user: ${req.user.email}`);
    
    const booking = await Booking.findOne({ 
      email: req.user.email 
    })
    .sort({ createdAt: -1 })
    .populate('activity');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'No bookings found'
      });
    }
    
    console.log(`Found latest booking ${booking._id} for user ${req.user.email}`);
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error('Error in getLatestBooking:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
