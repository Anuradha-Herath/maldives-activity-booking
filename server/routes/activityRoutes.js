const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Route to get all activities
router.get('/', activityController.getAllActivities);

// Route to get a single activity by ID
router.get('/:id', activityController.getActivityById);

// Route to create a new activity (admin only)
router.post('/', activityController.createActivity);

// Route to update an existing activity (admin only)
router.put('/:id', activityController.updateActivity);

// Route to delete an activity (admin only)
router.delete('/:id', activityController.deleteActivity);

module.exports = router;