import mongoose from 'mongoose';
import crypto from 'crypto';
import { IProduct } from '../types/products';

interface IProductDocument extends IProduct, Omit<mongoose.Document, '_id'> {
  _id: string;
}

const productSchema = new mongoose.Schema<IProductDocument>({
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
  countInStock: {
    type: Number,
    default: 0,
    min: 0,
  },
});

export default mongoose.models.Product || mongoose.model<IProductDocument>('Product', productSchema, 'Product');
