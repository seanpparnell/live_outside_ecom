import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const getAllProductsByCategory = async (category) => {
  try {
    const productsInCategory = await Product.find({
      category: category._id,
    }).populate("variations");

    return productsInCategory.map((product) => {
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
    console.error("Error in getAllProductsByCategory:", error);
    throw new Error("Error fetching products in the category");
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
    console.error("Error in getCategories:", error);
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

    const allProducts = await getAllProductsByCategory(category);
    res.json(allProducts);
  } catch (error) {
    console.error("Error in getProductsInCategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getCategories, getProductsInCategory };
