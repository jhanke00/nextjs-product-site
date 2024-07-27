export interface Order {
  id: number;
  userId: number;
  items: { productId: number; quantity: number; price: number }[];
  totalPrice: number;
}

// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//   }],
//   totalPrice: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
//   status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
// });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;
