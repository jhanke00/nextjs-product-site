import mongoose from 'mongoose';
import crypto from 'crypto';

interface IProduct extends mongoose.Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countOnStock: number;
}

const productSchema = new mongoose.Schema<IProduct>({
  _id: {
    type: String,
    default: crypto.randomUUID(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countOnStock: {
    type: Number,
    default: 0,
    min: 0,
  },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema, 'Product');
