import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  originalPrice: {
    type: Number,
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
  },
  emoji: {
    type: String,
    default: '🛒',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);