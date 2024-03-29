import express from "express";
const router = express.Router();
import { getCategories, getCategoryById, getProductsInCategory} from "../controllers/categoryController.js";


router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);
router.route('/subcategories/:id').get(getCategories);
router.route('/:id/products').get(getProductsInCategory);
// router.route('/subcategories/:id/products').get(getProductsInSubCategory)





export default router;
