import express from "express";
const router = express.Router();
import { getCategories, getCategoriesById, getProductsInCategory, getSubCategories, getAllProductsByCategory } from "../controllers/categoryController.js";


router.route('/').get(getCategories);
router.route('/subcategories').get(getSubCategories);
router.route('/:id').get(getCategoriesById);
router.route('/:id/products').get(getProductsInCategory)





export default router;
