// controllers/category.controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvkeelhmh",
  api_key: "685198765693854",
  api_secret: "_lOdyb5XDhgVzXVtiQne6vXn9nQ",
});

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        title,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { title, parentCategoryId } = req.body;

    // Assuming title is an array, create a new row for each element
    for (const name of title) {
      await prisma.category.create({
        data: {
          title: name,
          parentCategoryId: parentCategoryId,
        },
      });
    }

    res.status(201).json({ message: "Subcategories created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rank, parentCategoryId } = req.body;

    const updateData = { title, rank: parseInt(rank, 10), parentCategoryId };

    // Check if image is provided
    if (req.files && req.files.image) {
      const file = req.files.image;

      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (err) {
          console.error("Error uploading image to Cloudinary:", err);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        updateData.image = result.url || "";

        try {
          const updatedCategory = await prisma.category.update({
            where: {
              id,
            },
            data: updateData,
          });

          res.status(200).json(updatedCategory);
        } catch (error) {
          console.error("Error updating category in database:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
    } else {
      // If image is not provided, update category without image
      const updatedCategory = await prisma.category.update({
        where: {
          id,
        },
        data: updateData,
      });

      res.status(200).json(updatedCategory);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, parentCategoryId } = req.body;

    const updateData = { title, parentCategoryId };

    // Check if image is provided
    if (req.files && req.files.image) {
      const file = req.files.image;

      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (err) {
          console.error("Error uploading image to Cloudinary:", err);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        updateData.image = result.url || "";

        try {
          const updatedSubCategory = await prisma.category.update({
            where: {
              id,
            },
            data: updateData,
          });

          res.status(200).json(updatedSubCategory);
        } catch (error) {
          console.error("Error updating subcategory in database:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
    } else {
      // If image is not provided, update subcategory without image
      const updatedSubCategory = await prisma.category.update({
        where: {
          id,
        },
        data: updateData,
      });

      res.status(200).json(updatedSubCategory);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
