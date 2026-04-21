import connectDB from '../../../../lib/mongodb';
import Order from '../../../../models/Order';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, data: order });
  }

  if (req.method === 'PUT') {
    const { status } = req.body;
    const VALID_STATUSES = ['pending', 'confirmed', 'delivered', 'cancelled'];

    if (!status) {
      return res.status(400).json({ success: false, message: 'status is required' });
    }
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid values: ${VALID_STATUSES.join(', ')}`,
      });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a cancelled order',
      });
    }
    if (order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a delivered order',
      });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: `Order status updated to "${status}"`,
      data: order,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}