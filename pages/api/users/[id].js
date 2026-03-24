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
  const { id } = req.query;
  const userId = parseInt(id);

  const userIndex = userList.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with id ${id} not found`,
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: userList[userIndex],
    });
  }

  if (req.method === 'PUT') {
    const { role, active, name, phone } = req.body;
    if (role && !VALID_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`,
      });
    }
    const updatedUser = {
      ...userList[userIndex],
      ...(name && { name }),
      ...(phone && { phone }),
      ...(role && { role }),
      ...(active !== undefined && { active }),
      id: userId,
    };
    userList[userIndex] = updatedUser;
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  }

  if (req.method === 'DELETE') {
    const deleted = userList[userIndex];
    userList = userList.filter((u) => u.id !== userId);
    return res.status(200).json({
      success: true,
      message: `User "${deleted.name}" deleted successfully`,
      data: deleted,
    });
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}