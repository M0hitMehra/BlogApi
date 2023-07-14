import express from "express";
import {isAuthenticated}  from "../middlewares/auth.js"
import { createBlog, deleteBlog, getAllBlogs, getSpecificBlogs, updateBlog } from "../controllers/blogController.js";

const router =  express.Router();

router.route("/create-blog").post(isAuthenticated,createBlog)
router.route("/update-blog/:_id").put(isAuthenticated,updateBlog)
router.route("/delete-blog/:_id").delete(isAuthenticated,deleteBlog)
router.route("/get-blogs").get(getAllBlogs)
router.route("/get-blog/:_id").get(getSpecificBlogs)


export default router