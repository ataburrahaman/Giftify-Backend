const { extend, concat } = require('lodash');

const Cart = require('../../Schema/cart/cart');

const getCartById = async (req, res, next) => {
	try {
		const cart = await Cart.findById(req.userId);
        console.log("USER ID",req.userId);
		if (!cart) {
			const userCart = new Cart({
				_id: req.userId,
			});
			await userCart.save();
			return res.json({ response: userCart.cartItems });
		}

		req.cart = cart;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};



const getCartItems = async (req, res) => {
	const { cart } = req;
   
	try {
		await cart.populate('cartItems.productDetails');
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.status(400).json({ response: error.message });
	}
};

const addCartItems = async (req, res) => {
	const { product } = req;
	const { cart } = req;
    console.log("Add To Cart",req.userId, cart, product);
	try {
		if (!cart.cartItems.id(product._id)) {
			const newProduct = {
				_id: product._id,
				productDetails: product._id,
                productId: product.productId,
				quantity: 1,
			};
			const updateCart = extend(cart, {
				cartItems: concat(cart.cartItems, newProduct),
			});
			await updateCart.save();
            console.log("Update Cart", updateCart);
			await updateCart.populate('cartItems.productDetails');
			res.json({ response: cart.cartItems });
		} else {
			res.json({ response: 'already exists in cart' });
		}
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

const updateQuantityOfCartItems = async (req, res) => {
	const { cart, product } = req;
	const { quantity } = req.body;
    let updateCartItem = cart.cartItems.id(product._id);

	updateCartItem = extend(updateCartItem, { quantity: quantity });
	cart.cartItems = extend(cart.cartItems, { updateCartItem });
	try {
		await cart.save();
		await cart.populate('cartItems.productDetails');
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.json({ success: false, response: error.message });
	}
};

const deleteCartItems = async (req, res) => {
	const { cart, product } = req;
	try {
		await cart.cartItems.id(product._id).remove();
		await cart.save();
		await cart.populate('cartItems.productDetails');
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

module.exports = {
	getCartItems,
	addCartItems,
	updateQuantityOfCartItems,
	deleteCartItems,
    getCartById
};