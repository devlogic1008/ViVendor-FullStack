const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createCategory = async (categoryBody) => {
  try {
    return await prisma.category.create({
      data: categoryBody,
      include: { subcategories: true },
    });
  } catch (error) {
    console.error('Error while creating category:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while creating category'
    );
  }
};

module.exports = {
  createCategory,
};
