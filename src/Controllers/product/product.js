const mongoose = require('mongoose')

const Product = require("../../Schema/products/product");


const findProductById = async (req, res, next, id) => {
  await Product.findOne({productId:id}).exec((err, product) => {
    if (err) {
      res.status(400).json({
        message: "product not found"
      });
    }
    console.log("Product", product);
    req.product = product;
    next();
  });
};

const createProduct = async (req, res) => {
  const { data } = req.body;
  const {
    productImage,
    productName,
    brandName,
    description,
    price,
    category,
    gender,
    outOfStock,
    discountByPercentage,
    type,
    seller,
    count
  } = data;

  console.log("Product ", data);

  const body = {
    productImage,
    productName,
    brandName,
    description,
    price,
    category,
    gender,
    outOfStock,
    discountByPercentage,
    type,
    seller,
    count
  };

  try {
    const products = new Product(body);
    await products.save();
    res.json({ products: products, success: true });
  } catch (error) {
    res.json({ succes: false, error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products: products, success: true });
  } catch (error) {
    res.json({ succes: false, error });
  }
};

const getProductById = async (req, res) => {
  const { product } = req;
  try {
    res.json({ response: product, success: true });
  } catch (error) {
    res.json({ succes: false, error });
  }
};

const deleteProducts = async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.remove({ _id: productId });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete product"
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProducts,
  findProductById,
  createProduct
};
