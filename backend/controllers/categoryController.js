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
// const getCategories = asyncHandler(async (req, res) => {
//   console.log("Fetching all categories...");

//   const categories = await Category.find({});
//   res.json(categories);
  
// });

const getCategories = asyncHandler(async (req, res) => {
  const parentCategories = await Category.find({parentCategory: null})
  const categoriesWithSubCategories = await Promise.all(
    parentCategories.map(async (parentCategory) => {
      const subCategories = await Category.find({parentCategory: parentCategory._id})
      return {
        parentCategory,
        subCategories
      }
    })
  )
  res.json(categoriesWithSubCategories)
})

const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await Category.find({parentCategory: category._id})
  res.json(subCategories)
})

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
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

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
});

const getAllProductsByCategory = async (category) => {
  let allProducts = [];

  const productsInCategory = await Product.find({category: category._id});
    allProducts = allProducts.concat(productsInCategory);

  for (const subCategory of category.subCategories) {
    const productsInSubCategory = await getAllProductsByCategory(subCategory)
    allProducts = allProducts.concat(productsInSubCategory)
  }
  return allProducts
}

export { getCategories, getCategoriesById, getProductsInCategory, getSubCategories, getAllProductsByCategory };
