import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  items: {
    type: [OrderItemSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
}, { timestamps: true });

export default mongoose.models.Order ||
  mongoose.model('Order', OrderSchema);