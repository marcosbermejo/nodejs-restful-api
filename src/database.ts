import mongoose from 'mongoose';
import logger from './logger';

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? '');
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
