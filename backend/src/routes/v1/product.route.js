const express = require('express');
const router = express.Router();


const {  createProduct,getAllProducts, deleteProduct} = require('../../controllers/product.controller');

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.delete('/products/:id',deleteProduct);

module.exports = router;