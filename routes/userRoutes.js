import express from "express";
import {
  forgotPassword,
  getAllUsers,
  loginController,
  logoutController,
  registerController,
  resetPassword,
  updateMyProfile,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").get(logoutController);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").post(isAuthenticated, updateMyProfile);

// ADMIN
router.route("/admin/users").get(isAuthenticated, isAdmin, getAllUsers);


export default router;
