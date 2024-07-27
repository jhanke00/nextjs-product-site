import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection string not found in environment variables.');
    }

    if (mongoose.connections[0].readyState) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
