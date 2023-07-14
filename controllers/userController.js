import User from "../models/User.js";
import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const registerController = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req?.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Enter all required fields", 400));
  }
  let userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already registered", 400));
  }

  const user = await User.create({ name, email, password });
  user.save();

  sendToken(res, 200, "User registered successfully", user);
});

export const loginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter all required fields", 400));
  }
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  let isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  sendToken(res, 200, "Logged in successfully", user);
});

export const logoutController = catchAsyncError(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    // sameSite: "none",
    // httpOnly: true,
    // secure: true,
  };

  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "Logged out successfully",
  });
});
