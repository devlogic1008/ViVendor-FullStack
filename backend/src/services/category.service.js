const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();   

const createCategory = async (categoryBody) => {
  try {
    const { subcategories, ...categoryData } = categoryBody;

    // Create category without subcategories
    const createdCategory = await prisma.category.create({
      data: {
        ...categoryData,
      },
    });

    // If there are subcategories, associate them with the created category
    if (subcategories && subcategories.length > 0) {
      const updatedCategory = await prisma.category.update({
        where: {
          id: createdCategory.id,
        },
        data: {
          subcategories: {
            createMany: {
              data: subcategories.map((sub) => ({ title: sub.title })),
            },
          },
        },
        include: {
          subcategories: true,
        },
      });

      return updatedCategory;
    }

    return createdCategory;
  } catch (error) {
    console.error('Error while creating category:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while creating category'
    );
  }
};


const getAllCategories = async () => {
  try {
    return await prisma.category.findMany({
      include: { subcategories: true },
    });
  } catch (error) {
    console.error('Error while fetching categories:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching categories'
    );
  }
};

const getCategoryById = async (categoryId) => {
  try {
    return await prisma.category.findUnique({
      where: { id: categoryId },
      include: { subcategories: true },
    });
  } catch (error) {
    console.error('Error while fetching category by ID:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching category by ID'
    );
  }
};

const updateCategory = async (categoryId, categoryBody) => {
  try {
    return await prisma.category.update({
      where: { id: categoryId },
      data: categoryBody,
      include: { subcategories: true },
    });
  } catch (error) {
    console.error('Error while updating category:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while updating category'
    );
  }
};

const deleteCategory = async (categoryId) => {
  try {
    return await prisma.category.delete({
      where: { id: categoryId },
    });
  } catch (error) {
    console.error('Error while deleting category:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while deleting category'
    );
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,

  deleteCategory,
};
