import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pagebuilder';

export async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI not found, using fallback');
    }
    
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(uri, {
        bufferCommands: false,
      });
      console.log('Connected to MongoDB successfully');
    } else {
      console.log('Using existing MongoDB connection');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
