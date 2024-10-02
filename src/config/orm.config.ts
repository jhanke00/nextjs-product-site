import mongoose from 'mongoose';
import './envConfig';

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/next-product-site';
const connectionOptions: mongoose.ConnectOptions = {};

export { connectionString, connectionOptions };
