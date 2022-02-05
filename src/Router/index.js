const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../Utils/Authorization')

const user = require('./user/index');
const cart = require('./cart/index');
const products = require('./products/index')
const wishlist = require('./wishlist/index')
const address = require('./address/address')

router.use('/user', user);
router.use('/cart', isAuthorized, cart);
router.use('/product', products);
router.use('/wishlist',isAuthorized, wishlist);
router.use('/address', address)
// router.use('/orders', products);

module.exports = router;