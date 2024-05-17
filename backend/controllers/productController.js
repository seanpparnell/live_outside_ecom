import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch All Products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch a Product by Id
// @route Get /api/products
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("variations");

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resouce Not Found");
  }
});

export { getProducts, getProductsById };
