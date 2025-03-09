import express from "express";
import { loginUser, logOut, signUp } from "../courseController/userController.js";
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', loginUser)
router.post('/logout', logOut)

export default router; 
