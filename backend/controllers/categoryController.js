import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// Helper function to get a category by ID
// const getCategoryById = async (categoryId) => {
//   console.log("getCategoriesById middleware executed. Category ID:", req.params.id);
//   return await Category.findById(categoryId);
// };

// @desc Fetch All Categories
// @route Get /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  console.log("Fetching all categories...");

  const categories = await Category.find({});
  res.json(categories);
});

// @desc Fetch a Category by Id
// @route Get /api/categories/:id
// @access Public
const getCategoriesById = asyncHandler(async (req, res) => {
  console.log("Fetching category by ID...");
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

// @desc Fetch All Products in a Category
// @route Get /api/categories/:id/products
// @access Public
const getProductsInCategory = asyncHandler(async (req, res) => {
  console.log("getProductsInCategory middleware executed. Category ID:", req.params.id);
  console.log("Fetching products in category...");
  const category = await Category.findById(req.params.id);

  if (category) {
    const productsInCategory = await Product.find({ category: req.params.id});
    console.log("Products in category:", productsInCategory);
    res.json({
      category,
      products: productsInCategory,
    });
  } else {
    res.status(404);
    throw new Error("Category Not Found")
  }
})

export { getCategories, getCategoriesById, getProductsInCategory };
