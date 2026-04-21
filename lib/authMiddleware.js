import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No token provided. Please login first.' };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { user: decoded };
  } catch (error) {
    return { error: 'Invalid or expired token. Please login again.' };
  }
}

export function requireRole(...roles) {
  return function (req) {
    const result = verifyToken(req);
    if (result.error) return result;

    if (!roles.includes(result.user.role)) {
      return {
        error: `Access denied. Required role: ${roles.join(' or ')}`,
      };
    }
    return { user: result.user };
  };
}