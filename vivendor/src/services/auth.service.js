const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
// const { tokenTypes } = require('../config/tokens');
// const { roles, findRole } = require('../config/roles');
// const { getShopByUserId } = require('./shop.service');
// const { getByUserId } = require('./strategicSalePartners.service');
// const { getServiceByUserId } = require('./serviceProvider.service');

const prisma = new PrismaClient();

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    // Fetch user data based on the provided email
    const user = await prisma.user.findUnique({ where: { email } });

    // If the user does not exist, throw an Unauthorized error
    if (!user) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Incorrect email or password'
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, throw an Unauthorized error
    if (!isPasswordMatch) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Incorrect email or password'
      );
    }

    // Return the authenticated user
    return user;
  } catch (error) {
    // Handle any error that might occur during the process
    throw error;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
