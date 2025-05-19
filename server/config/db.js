const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/activity_booking_website', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        console.error('Make sure MongoDB is running and the connection string is correct');
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;