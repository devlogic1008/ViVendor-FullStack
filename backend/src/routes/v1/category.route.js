const express = require('express');
const router = express.Router();
const { categoryController } = require('../../controllers');

// Register route
router.post('/create-category', categoryController.createCategory);

module.exports = router;
