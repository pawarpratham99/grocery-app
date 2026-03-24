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
  const { id } = req.query;
  const orderId = parseInt(id);

  const orderIndex = orderList.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Order with id ${id} not found`,
    });
  }

  // GET single order
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: orderList[orderIndex],
    });
  }

  // PUT - update order status
  if (req.method === 'PUT') {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'status is required',
      });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses are: ${VALID_STATUSES.join(', ')}`,
      });
    }

    // Cannot update a cancelled order
    if (orderList[orderIndex].status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a cancelled order',
      });
    }

    // Cannot update a delivered order
    if (orderList[orderIndex].status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a delivered order',
      });
    }

    const updatedOrder = {
      ...orderList[orderIndex],
      status,
    };

    orderList[orderIndex] = updatedOrder;

    return res.status(200).json({
      success: true,
      message: `Order status updated to "${status}"`,
      data: updatedOrder,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}
// ```

// ---

// ## Step 5 — Test in Postman

// ### Test 1 — GET All Orders
// ```
// Method → GET
// URL    → http://localhost:3000/api/orders
// ```
// Should return all 5 orders ✅

// ---

// ### Test 2 — GET Orders by Status
// ```
// Method → GET
// URL    → http://localhost:3000/api/orders?status=pending
// ```
// Should return 2 pending orders ✅

// ---

// ### Test 3 — GET Orders by User
// ```
// Method → GET
// URL    → http://localhost:3000/api/orders?userId=2
// ```
// Should return Priya's 2 orders ✅

// ---

// ### Test 4 — GET Single Order
// ```
// Method → GET
// URL    → http://localhost:3000/api/orders/1
// ```
// Should return order 1 details ✅

// ---

// ### Test 5 — POST New Order
// ```
// Method → POST
// URL    → http://localhost:3000/api/orders
// Body   → raw → JSON