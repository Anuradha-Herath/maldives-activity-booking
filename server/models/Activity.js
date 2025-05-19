const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    required: [true, 'Please add an activity type'],
    enum: ['cruises', 'diving', 'island-tours', 'water-sports', 'adventure', 'cultural', 'wellness']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);