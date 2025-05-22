const Activity = require('../models/Activity');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Get dashboard statistics
// @route   GET /api/v1/dashboard/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts of various entities
    const [totalActivities, totalUsers, totalBookings, pendingBookings] = await Promise.all([
      Activity.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' })
    ]);

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('activity', 'title image price')
      .lean();

    res.status(200).json({
      success: true,
      data: {
        totalActivities,
        totalUsers,
        totalBookings,
        pendingBookings,
        recentBookings
      }
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
