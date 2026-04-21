import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter);
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  }

  if (req.method === 'POST') {
    const { name, email, phone, role } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'name, email and phone are required',
      });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }
    const user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}