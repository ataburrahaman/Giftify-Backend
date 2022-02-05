const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addCartItems,
  deleteCartItems,
  updateQuantityOfCartItems,
  getCartById
} = require("../../Controllers/cart/cart");

const { findProductById } = require("../../Controllers/product/product")

// const {
// 	getCartById,
// 	findProductById,
// 	isAuthorized,
// } = require('../Controllers/param');
// const router = express.Router();

router.param('productId', findProductById);

router.get("/",getCartById, getCartItems);
router.post("/:productId",getCartById, addCartItems);
router.put("/:productId",getCartById, updateQuantityOfCartItems);
router.delete("/:productId",getCartById, deleteCartItems);

module.exports = router;
