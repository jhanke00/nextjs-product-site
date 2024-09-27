import { IProduct } from '@/src/domain/models/products';
import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema<IProduct> = new Schema({
  _id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  countInStock: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
