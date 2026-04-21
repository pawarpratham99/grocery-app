import connectDB from '../../../lib/mongodb';
import Product from '../../../models/Product';
import User from '../../../models/User';
import Order from '../../../models/Orders';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();

  // Clear existing data
  await Product.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  // Seed products
  await Product.insertMany([
    { name: 'Fresh Tomatoes', category: 'Vegetables', price: 40, originalPrice: 60, unit: '500g', emoji: '🍅', inStock: true, rating: 4.5, reviews: 128, description: 'Fresh ripe tomatoes from local farms', tags: ['fresh', 'local'] },
    { name: 'Amul Milk', category: 'Dairy', price: 28, originalPrice: 28, unit: '500ml', emoji: '🥛', inStock: true, rating: 4.8, reviews: 340, description: 'Amul full cream milk', tags: ['dairy', 'daily'] },
    { name: 'Banana', category: 'Fruits', price: 35, originalPrice: 45, unit: '6 pcs', emoji: '🍌', inStock: true, rating: 4.3, reviews: 95, description: 'Fresh yellow bananas', tags: ['fresh', 'healthy'] },
    { name: 'Eggs', category: 'Dairy', price: 90, originalPrice: 100, unit: '12 pcs', emoji: '🥚', inStock: true, rating: 4.6, reviews: 210, description: 'Farm fresh eggs', tags: ['protein', 'daily'] },
    { name: 'Spinach', category: 'Vegetables', price: 25, originalPrice: 30, unit: '250g', emoji: '🥬', inStock: true, rating: 4.5, reviews: 88, description: 'Fresh green spinach', tags: ['healthy', 'green'] },
  ]);

  // Seed users
  await User.insertMany([
    { name: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '9876543210', role: 'admin', active: true },
    { name: 'Priya Patel', email: 'priya@gmail.com', phone: '9876543211', role: 'customer', active: true },
    { name: 'Amit Singh', email: 'amit@gmail.com', phone: '9876543212', role: 'delivery_agent', active: true },
  ]);

  return res.status(200).json({
    success: true,
    message: 'Database seeded successfully',
  });
}