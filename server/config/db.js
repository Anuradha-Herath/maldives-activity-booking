const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        // Check if MongoDB URI is provided
        const uri = process.env.MONGODB_URI || process.env.DB_URI;
        if (!uri) {
            throw new Error('MongoDB URI not provided. Please set MONGODB_URI or DB_URI environment variable.');
        }
        
        console.log('🔗 Attempting to connect to MongoDB...');
        console.log('📊 Database target:', uri.split('/').pop().split('?')[0]);
        
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`✅ MongoDB connected successfully!`);
        console.log(`🏠 Host: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.db.databaseName}`);
        console.log(`📊 Connection state: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
        
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        
        // Provide specific error guidance
        if (error.message.includes('authentication failed')) {
            console.error('🔐 Authentication issue: Check username/password in connection string');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            console.error('🌐 Network issue: Check internet connection and MongoDB Atlas whitelist');
        } else if (error.message.includes('URI not provided')) {
            console.error('⚙️ Configuration issue: Set MONGODB_URI environment variable');
        }
        
        console.error('🔧 Troubleshooting tips:');
        console.error('  1. Verify MongoDB Atlas cluster is running');
        console.error('  2. Check IP whitelist (add 0.0.0.0/0 for Render)');
        console.error('  3. Verify username/password in connection string');
        console.error('  4. Ensure MONGODB_URI environment variable is set');
        
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;