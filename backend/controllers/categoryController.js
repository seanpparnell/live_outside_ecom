import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// Fetch all products under a given category
const getAllProductsByCategory = async (category) => {
  let allProducts = [];

  const productsInCategory = await Product.find({
    category: category._id,
  }).populate("variations");
  allProducts = allProducts.concat(
    productsInCategory.map((product) => {
      const { variations, ...rest } = product.toObject();
      return {
        ...rest,
        variations: variations.map((variation) => ({
          name: variation.attribute,
          value: variation.value,
        })),
      };
    })
  );

  // Include variations of subcategories if needed

  return allProducts;
};

// Fetch all products under a given subcategory
const getAllProductsBySubCategory = async (subcategory) => {
  let allProducts = [];

  const productsInSubCategory = await Product.find({
    subCategory: subcategory._id,
  }).populate("variations");
  allProducts = allProducts.concat(
    productsInSubCategory.map((product) => {
      const { variations, ...rest } = product.toObject();
      return {
        ...rest,
        variations: variations.map((variation) => ({
          name: variation.attribute,
          value: variation.value,
        })), 
      };
    })
  );

  // Include variations of subsubcategories if needed

  return allProducts;
};

// @desc Fetch All Categories
// @route Get /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const parentCategories = await Category.find({ parentCategory: null });
  const categoriesWithSubCategories = await Promise.all(
    parentCategories.map(async (parentCategory) => {
      const subCategories = await Category.find({
        parentCategory: parentCategory._id,
      });
      return {
        parentCategory,
        subCategories,
      };
    })
  );
  res.json(categoriesWithSubCategories);
});

// @desc Fetch All Products in a Category
// @route Get /api/categories/:id/products
// @access Public
const getProductsInCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }

    const allProducts = await getAllProductsByCategory(category);
    res.json({
      category,
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Fetch All Products in a Subcategory
// @route Get /api/subcategories/:id/products
// @access Public
const getProductsInSubCategory = asyncHandler(async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subCategory = await Category.findById(subCategoryId);

    if (!subCategory) {
      res.status(404).json({ message: "Subcategory Not Found" });
      return;
    }

    const allProducts = await getAllProductsBySubCategory(subCategory);
    res.json({
      subCategory,
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getCategories, getProductsInCategory, getProductsInSubCategory };
