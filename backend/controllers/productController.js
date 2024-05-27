import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate('category', 'name')
    .populate('subCategory', 'name');

  const productsWithCategoryNames = products.map(product => ({
    ...product.toObject(),
    categoryName: product.category.name,
    subCategoryName: product.subCategory.name,
  }));

  res.json(productsWithCategoryNames);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name')
    .populate('subCategory', 'name');

  if (product) {
    const productWithCategoryNames = {
      ...product.toObject(),
      categoryName: product.category.name,
      subCategoryName: product.subCategory.name,
    };
    res.json(productWithCategoryNames);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductsById };
