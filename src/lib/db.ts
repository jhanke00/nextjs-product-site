import mongoose from 'mongoose';
import { connectionOptions, connectionString as defaultConnectionString } from '@config/orm.config';

async function connectToDatabase(connectionString?: string): Promise<mongoose.Connection> {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected');
    return mongoose.connection;
  }

  try {
    const connStr = connectionString || defaultConnectionString;
    console.log('Connecting to MongoDB:', connStr);
    await mongoose.connect(connStr, connectionOptions);
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export { connectToDatabase };
