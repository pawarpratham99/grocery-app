import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  await connectDB();

  // GET all products
  if (req.method === 'GET') {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  }

  // POST new product
  if (req.method === 'POST') {
    const { name, category, price, unit } = req.body;
    if (!name || !category || !price || !unit) {
      return res.status(400).json({
        success: false,
        message: 'name, category, price and unit are required',
      });
    }
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}