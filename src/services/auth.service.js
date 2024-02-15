const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
// Function to create a new user
async function createUser(data) {
  try {
    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        emailVerified: false,
      },
    });
    console.log('User created:', user);
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to find a user by email
async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to create a refresh token for a user
async function createRefreshToken(userId, hashedToken) {
  try {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        hashedToken,
        userId,
      },
    });
    return refreshToken;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  createRefreshToken,
};
