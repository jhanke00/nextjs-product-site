import { IOrder, IOrderItem } from '@/src/domain/models';
import mongoose, { Schema } from 'mongoose';

const OrderItemSchema: Schema<IOrderItem> = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
});

const OrderSchema: Schema<IOrder> = new Schema({
  user: { type: String, required: true },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  time: { type: Date, required: true, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
