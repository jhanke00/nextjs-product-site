import mongoose, { CallbackError } from 'mongoose';
import crypto from 'crypto';

export interface IOrder extends mongoose.Document {
  _id: string;
  user: string;
  items: {
    id: string;
    name: string;
    price: number;
    count: number;
  }[];
  total: number;
  time: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
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
orderSchema.pre<IOrder>('save', function (next) {
  this.total = this.items.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema, 'Order');
