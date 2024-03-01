const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  const { email, password, role, ...userData } = userBody;

  // Find the requested role from the role model
  const selectedRole = await prisma.role.findFirst({
    where: {
      name: role,
    },
  });
  if (!selectedRole) {
    throw new ApiError(`Role "${role}" not found.`);
  }

  // Get permissions based on the role
  let userPermissions = [];
  if (role === 'admin') {
    userPermissions = await prisma.permission.findMany();
  } else if (role === 'user') {
    // For a user role, assign only specific permissions (e.g., read and write)
    userPermissions = await prisma.permission.findMany({
      where: {
        name: { in: ['create', 'read'] },
      },
    });
    console.log('🚀 ~ createUser ~ permissions:', userPermissions);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user with the hashed password and assigned permissions
  // Create the user with the hashed password and assigned permissions
  const user = await prisma.user.create({
    data: {
      ...userData,
      email,
      password: hashedPassword,
      roles: {
        create: [{ role: { connect: { id: selectedRole.id } } }],
      },
      permissions: {
        create: userPermissions.map((permission) => ({
          permission: { connect: { id: permission.id } },
        })),
      },
    },
  });

  // console.log('Here is new user data:', user);

  return user;
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const users = await prisma.user.findMany({
    where: filter,
    orderBy: sortBy
      ? { [sortBy.split(':')[0]]: sortBy.split(':')[1] }
      : undefined,
    take: limit,
    skip: (page - 1) * limit,
  });
  return users;
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

/**
 * Update user by id
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email) {
    const existingUser = await prisma.user.findFirst({
      where: { email: updateBody.email },
    });
    if (existingUser && existingUser.id !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }
  return prisma.user.update({ where: { id: userId }, data: updateBody });
};

/**
 * Delete user by id
 * @param {number} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return prisma.user.delete({ where: { id: userId } });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
