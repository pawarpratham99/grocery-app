import fs from 'fs';
import path from 'path';

function getOrders() {
  const filePath = path.join(process.cwd(), 'data', 'orders.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

const VALID_STATUSES = ['pending', 'confirmed', 'delivered', 'cancelled'];
let orderList = getOrders();

export default function handler(req, res) {

  // GET all orders
  if (req.method === 'GET') {

    // Optional filter by status → /api/orders?status=pending
    const { status, userId } = req.query;

    let result = [...orderList];

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Valid statuses are: ${VALID_STATUSES.join(', ')}`,
        });
      }
      result = result.filter((o) => o.status === status);
    }

    // Optional filter by userId → /api/orders?userId=2
    if (userId) {
      result = result.filter((o) => o.userId === parseInt(userId));
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  }

  // POST - place new order
  if (req.method === 'POST') {
    const { userId, userName, items, address } = req.body;

    // Validation
    if (!userId || !userName || !items || !address) {
      return res.status(400).json({
        success: false,
        message: 'userId, userName, items and address are required',
      });
    }

    // Items must be an array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'items must be a non-empty array',
      });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const newOrder = {
      id: orderList.length + 1,
      userId,
      userName,
      items,
      totalAmount,
      status: 'pending',
      address,
      createdAt: new Date().toISOString().split('T')[0],
    };

    orderList.push(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}