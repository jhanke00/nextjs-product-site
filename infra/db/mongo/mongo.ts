import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

if (!MONGO_URI) {
  throw new Error('Define the MONGO_URI environment variable');
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Se já estiver conectado, não faz nada
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
