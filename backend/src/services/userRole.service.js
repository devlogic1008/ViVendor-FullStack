const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

const createRole = async (userBody) => {
  const { name } = userBody; // Extract name form req body
  return prisma.role.create({
    data: { name },
  });
};

// Function to get a role by its ID
const getRoleById = async (roleId) => {
  console.log('🚀 ~ getRoleById ~ roleId:', roleId);

  try {
    // Retrieve the role from the database by ID
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    // If the role doesn't exist, return a 404 Not Found response
    if (!role) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Role is not find by this id'
      );
    }

    // Return the role as JSON response
    return role;
  } catch (error) {
    console.error('Error getting role by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all roles
const getAllRoles = async () => {
  try {
    // Retrieve all roles from the database
    const roles = await prisma.role.findMany();
    if (!roles) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Dont have any role in db');
    }

    // Return the roles as JSON response
    return roles;
  } catch (error) {
    console.error('Error getting all roles:', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Error getting roles');
  }
};

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
};
