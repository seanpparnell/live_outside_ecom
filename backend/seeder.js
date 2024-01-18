import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Category from "./models/categoryModel.js";
import connectDB from "./config/db.js";
import { parentCategories, subCategories } from "./data/category.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    console.log("Deleting existing data...");
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    // console.log("Inserting users...");
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // console.log("Inserting parent categories...");
    const createdParentCategories = await Category.insertMany(parentCategories);
    const categoryMap = {}; // Define categoryMap here

    createdParentCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    // console.log("Inserting sub categories...");
    await Category.insertMany(
      subCategories.map((category) => ({
        ...category,
        parentCategory: categoryMap[category.parentCategory], 
      }))
    );

    // console.log("Modifying products...");
    const modifiedProducts = products.map(async (product) => {
      const { category, subCategory, ...rest } = product;

      const categoryId = categoryMap[product.category];
      // console.log(`product.category: ${product.category}`);
      // console.log(`categoryId: ${categoryId}`);

      const subCategoryObj = subCategories.find(
        (sub) => sub.name === subCategory
      );
      console.log(`subCategory: ${subCategory}`);
      console.log(`subCategoryObj: ${JSON.stringify(subCategoryObj)}`);

      if (categoryId && subCategoryObj) {
        // Fetch the subCategoryId from MongoDB
        const subCategoryId = await Category.findOne({
          name: subCategoryObj.name,
        }).exec();
        

        // Associate subCategoryId with subcategory object
        subCategoryObj.subCategoryId = subCategoryId._id;

       
        return {
          ...rest,
          user: adminUser,
          category: categoryId,
          subCategory: subCategoryId,
        };
      }

      console.error(
        `Category or Sub-category not found for product: ${product.name}`
      );
      return null; // Handle the case when category or sub-category is not found
    });

    console.log("Inserting products...");
    await Product.insertMany(
      (
        await Promise.all(modifiedProducts)
      ).filter((product) => product !== null)
    );

    console.log("Data Imported:".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Deleting existing data...");
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
