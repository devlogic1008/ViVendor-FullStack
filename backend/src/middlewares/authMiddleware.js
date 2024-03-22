const config = require('../config/config');
const jwt = require('jsonwebtoken');
const roles = require('../config/roles');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserDataWithRole = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    // console.log('🚀 ~ getUserDataWithRole ~ token:', token);

    const decoded = jwt.verify(token, config.jwt.secret);
    // console.log('🚀 ~ getUserDataWithRole ~ decoded:', decoded);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    // console.log('🚀 ~ getUserDataWithRole ~ user:', user);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if user has roles
    if (!user.roles || user.roles.length === 0) {
      return res.status(401).json({ error: 'User has no roles assigned' });
    }

    // Check if any role matches the desired role
    const desiredRole = 'super-admin'; // Change to your desired role
    const userRole = user.roles.find((role) => role.role.name === desiredRole);

    if (!userRole) {
      return res
        .status(401)
        .json({ error: 'User does not have the required role' });
    }

    // Include role name directly in the user data object
    user.role = userRole.role.name;

    return res.json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = getUserDataWithRole;
