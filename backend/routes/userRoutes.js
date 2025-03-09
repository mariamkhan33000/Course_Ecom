import express from "express";
import { loginUser, logOut, purchase, signUp } from "../courseController/userController.js";
import { protect } from "../middlewares/userMiddleware.js";


const router = express.Router()

router.post('/signup', signUp)
router.post('/login', loginUser)
router.post('/logout', logOut)
router.get('/purchases',protect, purchase)

export default router; 
