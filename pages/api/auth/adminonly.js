import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { requireRole } from '../../../lib/authMiddleware';

export default async function handler(req, res) {

  // Only admin can access
  const auth = requireRole('admin')(req);
  if (auth.error) {
    return res.status(403).json({
      success: false,
      message: auth.error,
    });
  }

  await connectDB();

  const users = await User.find({}).select('-password');

  return res.status(200).json({
    success: true,
    message: 'Welcome Admin! Here are all users.',
    count: users.length,
    data: users,
  });
}