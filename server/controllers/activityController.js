const Activity = require('../models/Activity');

// @desc    Get all activities with filtering options
// @route   GET /api/v1/activities
// @access  Public
exports.getAllActivities = async (req, res) => {
  try {
    let query = {};
    
    // Filter by activity type
    if (req.query.type) {
      if (Array.isArray(req.query.type)) {
        query.type = { $in: req.query.type };
      } else {
        query.type = req.query.type;
      }
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    
    // Filter by duration
    if (req.query.minDuration || req.query.maxDuration) {
      query.duration = {};
      if (req.query.minDuration) query.duration.$gte = Number(req.query.minDuration);
      if (req.query.maxDuration) query.duration.$lte = Number(req.query.maxDuration);
    }
    
    // Filter by location
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    
    // Filter by featured
    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    } else {
      // By default, only show active activities
      query.status = 'active';
    }
    
    // Sorting options
    let sortOptions = {};
    const sortBy = req.query.sortBy || 'popularity';
    
    switch (sortBy) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'duration':
        sortOptions.duration = 1;
        break;
      case 'popularity':
      default:
        sortOptions.rating = -1;
        break;
    }
    
    const activities = await Activity.find(query).sort(sortOptions);
    
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    console.error('Error fetching activities:', err);
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