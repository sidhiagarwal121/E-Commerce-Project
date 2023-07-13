import express from 'express'
import { requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js'
const router=express.Router()
import {registerController,loginController,testController} from '../controllers/authController.js'
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,testController)
export default router