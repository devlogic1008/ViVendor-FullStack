const express = require('express');
const categoryController = require('../../controllers/category.controller');
const multer = require('multer');
const router = express.Router();      
const fs = require('fs');

const uploadFolder = './uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}


// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Set the destination folder for storing images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage });

// Create a new category
router.post('/create-category', categoryController.createCategory);

// Get all categories
router.get('/get-all-categories', categoryController.getAllCategories);

// Get category by ID
router.get('/get-category/:id', categoryController.getCategoryById);
 
// Update category by ID
router.put('/update-category/:id', upload.single("image"), categoryController.updateCategory);

// Delete category by ID
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
