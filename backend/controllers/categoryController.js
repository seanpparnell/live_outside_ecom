import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const getAllProductsByCategoryOrSubCategory = async (categoryId) => {
  try {
    const productsInCategoryOrSubCategory = await Product.find({
      $or: [
        { category: categoryId },
        { subCategory: categoryId }
      ],
    }).populate("variations");

    return productsInCategoryOrSubCategory.map((product) => {
      const { variations, ...rest } = product.toObject();
      return {
        ...rest,
        variations: variations.map((variation) => ({
          name: variation.color,
          value: variation.sizes,
        })),
      };
    });
  } catch (error) {
    throw new Error("Error fetching products in the category or subcategory");
  }
};

const getCategories = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const parentCategoryId = req.params.id;
    const subCategories = await Category.find({ parentCategory: parentCategoryId });

    if (!subCategories || subCategories.length === 0) {
      res.status(404).json({ message: "Subcategories Not Found" });
      return;
    }

    res.json(subCategories);
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getProductsInCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }

    let allProducts = await getAllProductsByCategoryOrSubCategory(category._id);

    res.json(allProducts);
  } catch (error) {
    console.error("Error in getProductsInCategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getCategories, getCategoryById, getProductsInCategory };
