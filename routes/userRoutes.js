import express from "express"
import { loginController, logoutController, registerController } from "../controllers/userController.js"


const router = express.Router()
 
router.route('/register').post(registerController)
router.route('/login').post(loginController)
router.route('/logout').get(logoutController)


export default router