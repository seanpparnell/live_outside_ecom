import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch All Products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.map((product, index) => ({...product.toObject(), position: index + 1}));
  };

  const products = await Product.find({});
  const shuffledProducts = shuffleArray(products);
  res.json(shuffledProducts);
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
    throw new Error('Resouce Not Found')
  }
});

export { getProducts, getProductsById };