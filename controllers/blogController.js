import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { poster, body, title, createdBy } = req.body;
  if (!body || !poster || !title || !createdBy)
    return next(new ErrorHandler("Please enter all required fields", 400));
  const blog = await Blog.create({ poster, body, title, createdBy });
  const user = await User.findById({ _id: req?.user?._id });
  blog.save();
  user.blogs.push(blog);
  user.save();
  res.status(200).json({
    success: true,
    message: "Blog created successfully",
  });
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
  const { poster, body, title, _id, createdBy } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    { _id },
    { poster, body, title, createdBy }
  );
  blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
  });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const { _id } = req.params;
  const { blogs } = req.user;
  const user = await User.findById({ _id: req?.user?._id });

  let newBlogs = blogs.map((blog) =>{
    if( blog._id !== _id ){
        return blog;
    }
  });
    console.log(newBlogs);
  user.blogs = newBlogs;

  const blog = await Blog.findByIdAndDelete({ _id });
  user.save();
  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

export const getSpecificBlogs = catchAsyncError(async (req, res, next) => {
  const { _id } = req.params;

  const blog = await Blog.findById({ _id });

  res.status(200).json({
    success: true,
    blog,
  });
});
