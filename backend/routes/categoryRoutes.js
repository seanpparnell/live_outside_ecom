import express from "express";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js"; // Import the Product model

const router = express.Router();

// Fetch all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch all products in this category
    const productsInCategory = await Product.find({ category: req.params.id });

    res.json({
      category,
      products: productsInCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
