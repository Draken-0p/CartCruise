import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productContoller.js";

//@desc Fetch All Product
//@route GET http://localhost:5000/api/product
//@access Public

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id/reviews").post(protect, createProductReview);

//@desc Fetch Single Product
//@route GET http://localhost:5000/api/product/:id
//@access Public

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
