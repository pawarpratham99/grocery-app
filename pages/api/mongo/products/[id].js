import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // GET single product
  if (req.method === 'GET') {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({ success: true, data: product });
  }

  // PUT update product
  if (req.method === 'PUT') {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  }

  // DELETE product
  if (req.method === 'DELETE') {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: `Product "${product.name}" deleted successfully`,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}