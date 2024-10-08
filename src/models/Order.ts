import mongoose from 'mongoose';
import crypto from 'crypto';
import { IOrder } from '../types/orders';

interface IOrderDocument extends IOrder, Omit<mongoose.Document, '_id'> {
  _id: string;
}

const orderSchema = new mongoose.Schema<IOrderDocument>({
  _id: {
    type: String,
    default: () => crypto.randomUUID(),
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  items: [
    {
      id: {
        type: String,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        requried: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

// Calculate total based on items in case we create a endpoint to insert orders
orderSchema.pre<IOrderDocument>('save', function (next) {
  this.total = this.items.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  next();
});

export default mongoose.models.Order || mongoose.model<IOrderDocument>('Order', orderSchema, 'Order');
