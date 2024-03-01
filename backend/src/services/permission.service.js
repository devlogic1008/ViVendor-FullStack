const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');
// const Helper = require('../utils/Helper');
const httpStatus = require('http-status');

const createPermission = async (userBody) => {
  const { name } = userBody; // Extract name form req body

  // Check if the permission already exists
  const existingPermission = await prisma.permission.findFirst({
    where: { name: name },
  });

  if (existingPermission) {
    throw new ApiError(httpStatus[403], `Permission "${name}" already exists.`);
  }

  // Create the permission
  const permission = await prisma.permission.create({
    data: { name: name },
  });

  return permission;
};

// Function to get a role by its ID
const getPermissionById = async (permissionId) => {
  // console.log('🚀 ~ getRoleById ~ roleId:', permissionId);

  try {
    // Retrieve the role from the database by ID
    const permission = await prisma.permission.findUnique({
      where: { id: permissionId },
    });

    // If the role doesn't exist, return a 404 Not Found response
    if (!permission) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Role is not find by this id'
      );
    }

    // Return the role as JSON response
    return permission;
  } catch (error) {
    console.error('Error getting role by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all roles
const getAllPermission = async () => {
  try {
    // Retrieve all roles from the database
    const permissions = await prisma.permission.findMany();
    if (!permissions) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Dont have any role in db');
    }

    // Return the roles as JSON response
    return permissions;
  } catch (error) {
    console.error('Error getting all roles:', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Error getting roles');
  }
};

module.exports = {
  createPermission,
  getPermissionById,
  getAllPermission,
};
