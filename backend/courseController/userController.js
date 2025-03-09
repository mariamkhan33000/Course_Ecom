import User from "../models/userModels.js";
import bcrypt from 'bcrypt'
import { z } from "zod";
import { generateTokenAndCookies } from "../lib/utils/genToken.js";
import { Purchase } from "../models/purchaseModel.js";
import { Course } from "../models/courseModels.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Zod schema for validation
    const userSchema = z.object({
      firstName: z.string().min(3, { message: 'First name must be at least 3 characters long' }),
      lastName: z.string().min(3, { message: 'Last name must be at least 3 characters long' }),
      email: z.string().email({ message: 'Invalid email format' }),
      password: z.string().min(6, { message: 'Password must be at least 6 characters' })
    });

    const validateData = userSchema.safeParse(req.body);
    if (!validateData.success) {
      return res.status(400).json({ 
        errors: validateData.error.issues.map(err => err.message) 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    if (newUser) {
       generateTokenAndCookies(newUser._id, res);
      return res.status(201).json({ message: "User created successfully", newUser });
    }
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    generateTokenAndCookies(user._id, res)

    res.status(200).json({ message: "Login successful", user :
        {
            _id : user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "strict"
        });
    
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log('Error in logout', error)
        res.status(500).json({errors: "Error in logout"})
    }
}


export const purchase = async (req, res) => {
  const userId = req.userId
  try {
      const purchased = await Purchase.find({userId})
      let purchasedCourseId = []
      for (let i = 0; i < purchased.length; i++) {
        purchasedCourseId.push(purchased[i].courseId)
      }
      const courseData = await Course.find({
        _id : {$in: purchasedCourseId}
      })
      res.status(200).json({purchased, courseData})
  } catch (error) {
      console.log(error, 'Error in purchase')
      res.status(500).json({error: 'Error in Purchase'})
  }
}