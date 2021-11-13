const _ = require('lodash');
const Wishlist = require('../../Schema/wishlist/wishlist');

const getWishlistById = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findById(req.userId);
		if (!wishlist) {
			const userWishlist = new Wishlist({
				_id: req.userId,
			});
			await userWishlist.save();
			return res.json({ response: userWishlist.wishlistItems });
		}
		req.wishlist = wishlist;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getWishlistItems = async (req, res) => {
	const { wishlist } = req;
	try {
		await wishlist.populate('wishlistItems.product').execPopulate();
		res.json({ response: wishlist.wishlistItems });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

const addWishlistItems = async (req, res) => {
	const { productId } = req.params;
	const { wishlist } = req;
	try {
		if (!wishlist.wishlistItems.id(productId)) {
			const addProductToWishlist = _.extend(wishlist, {
				wishlistItems: _.concat(wishlist.wishlistItems, {
					_id: productId,
					product: productId,
				}),
			});
			await addProductToWishlist.save();
			await addProductToWishlist
				.populate('wishlistItems.product')
				.execPopulate();
			res.json({ response: addProductToWishlist.wishlistItems });
		} else throw Error('item already exists in wishlist');
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

const deleteWishlistItems = async (req, res) => {
	const { productId } = req.params;
	const { wishlist } = req;
	try {
		await wishlist.wishlistItems.id(productId).remove();
		await wishlist.save();
		await wishlist.populate('wishlistItems.product').execPopulate();
		res.json({ response: wishlist.wishlistItems });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

module.exports = {
	getWishlistItems,
	addWishlistItems,
	deleteWishlistItems,
    getWishlistById
};