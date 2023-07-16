import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/categoryController.js";

const router =  express.Router()

router.route("/create-category").post(isAuthenticated , isAdmin , createCategory)
router.route("/update-category").put(isAuthenticated , isAdmin , updateCategory)
router.route("/get-categories").get(  getAllCategories )
router.route("/delete-category/:name").delete(isAuthenticated , isAdmin , deleteCategory)

export default router