const express = require('express');


const {
	getWishlistItems,
	addWishlistItems,
	deleteWishlistItems,
    getWishlistById
} = require('../../Controllers/wishlist/wishlist');

const router = express.Router();

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