const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/v1/activities
// @access  Public
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single activity by ID
// @route   GET /api/v1/activities/:id
// @access  Public
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new activity
// @route   POST /api/v1/activities
// @access  Private (Admin only)
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    
    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update activity
// @route   PUT /api/v1/activities/:id
// @access  Private (Admin only)
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete activity
// @route   DELETE /api/v1/activities/:id
// @access  Private (Admin only)
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};