import express from "express";
const router = express.Router();
import { getCategories, getCategoriesById, getProductsInCategory } from "../controllers/categoryController.js";


router.route('/').get(getCategories);
router.route('/:id').get(getCategoriesById);
router.route('/:id/products').get(getProductsInCategory)





export default router;
