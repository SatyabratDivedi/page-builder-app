import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    if (!uri) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
