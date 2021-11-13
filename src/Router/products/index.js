const express = require('express');
const router = express.Router();
const {
	getProducts,
	deleteProducts,
	getProductById,
    findProductById,
    createProduct
} = require('../../Controllers/product/product');

router.param('productId', findProductById);

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/create', createProduct);
router.delete('/:productId', deleteProducts);


module.exports = router;
