import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

async function mongoDbConnection(): Promise<typeof mongoose> {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined');
  }

  return mongoose.connect(MONGO_URL).then((mongoose) => {
    return mongoose;
  });
}

export default mongoDbConnection;
