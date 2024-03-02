const express = require('express');
const categoryController = require('../../controllers/category.controller');
const router = express.Router();      

// Create a new category
router.post('/create-category', categoryController.createCategory);
router.post('/create-sub-category', categoryController.createSubCategory);

// Get all categories
router.get('/get-all-categories', categoryController.getAllCategories);

// Get category by ID
router.get('/get-category/:id', categoryController.getCategoryById);
 
// Update category by ID
router.put('/update-category/:id', categoryController.updateCategory);
router.put('/update-sub-category/:id', categoryController.updateSubCategory);

// Delete category by ID
router.delete('/delete-category/:id', categoryController.deleteCategory);
router.delete('/delete-sub-category/:id', categoryController.deleteSubCategory);

module.exports = router;
