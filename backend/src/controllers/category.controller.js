// controllers/categoryController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

const path = require('path');
const createCategory = async (req, res) => {
  try {
    const { title} = req.body;


    const newCategory = await prisma.category.create({
      data: {
        title,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { title,  parentCategoryId } = req.body;

    const subCategory = await prisma.category.create({
      data: {
        title,
     
        parentCategoryId,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 
  



const updateCategory = async (req, res) => {
  try {
   

    const { id } = req.params;
    const { title, rank, parentCategoryId } = req.body;

    // Check if an image file is uploaded
    const imageFile = req.file;
    console.log("🚀 ~ updateCategory ~ imageFile:", imageFile)
    let imagePath = null;

    if (imageFile) {
      // Save the path to the uploaded image
      imagePath = imageFile.path;
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        rank: parseInt(rank, 10),
        image: imagePath, // Update the image directly with the path
        parentCategoryId,
      },
      
    });

    // Handle the response or any further logic here
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Export the asynchronous function



const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
