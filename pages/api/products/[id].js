import fs from 'fs';
import path from 'path';

function getProducts() {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

let productList = getProducts();

export default function handler(req, res) {
  const { id } = req.query;
  const productId = parseInt(id);

  // Find product
  const productIndex = productList.findIndex((p) => p.id === productId);

  // If not found
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
    });
  }

  // GET single product
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: productList[productIndex],
    });
  }

  // PUT - update product
  if (req.method === 'PUT') {
    const updatedProduct = {
      ...productList[productIndex],
      ...req.body,
      id: productId, // prevent id from being changed
    };

    productList[productIndex] = updatedProduct;

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }

  // DELETE product
  if (req.method === 'DELETE') {
    const deleted = productList[productIndex];
    productList = productList.filter((p) => p.id !== productId);

    return res.status(200).json({
      success: true,
      message: `Product "${deleted.name}" deleted successfully`,
      data: deleted,
    });
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}