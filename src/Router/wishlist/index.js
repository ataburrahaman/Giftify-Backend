const express = require('express');


const {
	getWishlistItems,
	addWishlistItems,
	deleteWishlistItems,
    getWishlistById
} = require('../../Controllers/wishlist/wishlist');
const { findProductById } = require("../../Controllers/product/product")

const router = express.Router();

router.param('productId', findProductById);

router.get('/', getWishlistById, getWishlistItems);
router.post(
	'/:productId',

	getWishlistById,
	addWishlistItems,
);
router.delete(
	'/:productId',

	getWishlistById,
	deleteWishlistItems,
);

module.exports = router;