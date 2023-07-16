import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import Category from "../models/Category.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createCategory = catchAsyncError(async (req, res, next) => {
  let keyword = req.body.category;
  let { array } = req.body;
  keyword = keyword.trim();
  const categoryExist = await Category.findOne({ name: keyword });

  if (categoryExist) {
    return next(new ErrorHandler("Category already exist", 400));
  }
  const category = await Category.create({ name: keyword });
  array.map((arr) => category.related.push({ similar: arr.trim() }));
  await category.save();

  res.status(200).json({
    success: true,
    message: "Category created successfully",
  });
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
  let keyword = req.body.category;
  let { array } = req.body;
  let { name } = req.body;
  keyword = keyword.trim();
  const category = await Category.findOne({ name: name.trim() });

  if (!category) {
    return next(new ErrorHandler("Category does not exist", 400));
  }

  category.name = keyword;

  let simArr = array;
  let newSimArr = [];
  let actualSimArr = category.related;

  for (let i = 0; i < simArr.length; i++) {
    const element = simArr[i].trim();

    let isPresent = false;

    for (let j = 0; j < actualSimArr.length; j++) {
      const jelement = actualSimArr[j].similar.trim();
      if (jelement === element) {
        isPresent = true;
        break;
      }
    }

    if (!isPresent) actualSimArr.push({ similar: element });
  }

  category.related = actualSimArr;
  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
  });
});

export const getAllCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.params;
  const category = await Category.findOne({ name: name.trim() });
  if (!category) return next(new ErrorHandler("Category does not exist", 400));
  await Category.deleteOne({ name: name.trim() });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
