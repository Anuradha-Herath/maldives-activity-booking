const Activity = require('../models/Activity');

// Function to get all activities
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a single activity by ID
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new activity
exports.createActivity = async (req, res) => {
    const activity = new Activity(req.body);
    try {
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to update an activity
exports.updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete an activity
exports.deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};