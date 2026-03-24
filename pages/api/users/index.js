import fs from 'fs';
import path from 'path';

function getUsers() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

const VALID_ROLES = ['admin', 'customer', 'delivery_agent'];
let userList = getUsers();

export default function handler(req, res) {

  if (req.method === 'GET') {
    const { role } = req.query;
    if (role) {
      if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({
          success: false,
          message: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`,
        });
      }
      const filtered = userList.filter((u) => u.role === role);
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    }
    return res.status(200).json({
      success: true,
      count: userList.length,
      data: userList,
    });
  }

  if (req.method === 'POST') {
    const { name, email, phone, role } = req.body;
    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: 'name, email, phone and role are required',
      });
    }
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`,
      });
    }
    const exists = userList.find((u) => u.email === email);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }
    const newUser = {
      id: userList.length + 1,
      name,
      email,
      phone,
      role,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    userList.push(newUser);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}