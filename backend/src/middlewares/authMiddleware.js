const config = require('../config/config');
const jwt = require('jsonwebtoken');
const roles = require('../config/roles');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log('🚀 ~ authMiddleware ~ token:', token);

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log('🚀 ~ authMiddleware ~ decoded:', decoded);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });
    console.log('🚀 ~ authMiddleware ~ user:', user);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Convert the user role to uppercase
    const userRole = user.role.toLowerCase();
    console.log('🚀 ~ authMiddleware ~ userRole:', userRole);

    // Check if the user role exists in the roles configuration
    if (!roles[userRole]) {
      return res.status(401).json({ error: 'Invalid user role' });
    }

    req.user = user; // Attach user object to request for further use
    req.userRole = roles[userRole]; // Attach user role object to request for further use
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
