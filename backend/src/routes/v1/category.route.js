const express = require('express');
const categoryController = require('../../controllers/category.controller');
const router = express.Router();      

// Get all categories
router.get('/categories', categoryController.getAllCategories);
// Create a new category
router.post('/categories', categoryController.createCategory);
// Get category by ID
router.get('categories/:id', categoryController.getCategoryById);
// Update category by ID
router.put('/categories/:id', categoryController.updateCategory);
// Delete category by ID
router.delete('/categories/:id', categoryController.deleteCategory);


router.post('/sub-categories', categoryController.createSubCategory);
router.put('/sub-categories/:id', categoryController.updateSubCategory);
 router.delete('/sub-categories/:id', categoryController.deleteSubCategory);

module.exports = router;
