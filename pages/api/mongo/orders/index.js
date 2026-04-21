import connectDB from '../../../../lib/mongodb';
import Order from '../../../../models/Orders';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { status, userId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.userId = userId;
    const orders = await Order.find(filter);
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  }

  if (req.method === 'POST') {
    const { userId, userName, items, address } = req.body;
    if (!userId || !userName || !items || !address) {
      return res.status(400).json({
        success: false,
        message: 'userId, userName, items and address are required',
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'items must be a non-empty array',
      });
    }
    const totalAmount = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    const order = await Order.create({ ...req.body, totalAmount });
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}