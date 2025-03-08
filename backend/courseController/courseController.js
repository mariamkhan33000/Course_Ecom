import { Course } from "../models/courseModels.js";
import { v2 as cloudinary } from 'cloudinary';

export const createCourse = async (req,res) => {
    const {title, description, price} = req.body;
    try {
        if(!title || !description || !price) {
            return res.status(400).json({errors: 'All fields are required'})
        }


        const {image} = req.files;
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({errors: 'No File is Uploaded'})
        }
        const allowedFormat = ['image/png', 'image/jpg']
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({errors: 'Invalid file format. Only PNG and JPG are allowed'})
        }
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)
        if(!cloud_response || cloud_response.error) {
            return res.status(400).json({errors: "Error upload file to cloudinary" })
        }
        const courseData = {
            title, description, price, image : {
                public_id : cloud_response.public_id,
                url : cloud_response.url
            }
        }
       const course = await Course.create(courseData)
       res.status(200).json({message : "Course created Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Server Error'})
    }
}

export const updateCourse = async (req, res) => {
    const {courseId} = req.params;
    const {title, description, price, image} = req.body
    try {
        const course = await Course.updateOne({
            _id: courseId
        },
        {
            title, 
            description,
            price, 
            image: {
            public_id: image?.public_id,
            url: image?.url
        }
        })
        res.status(200).json({message : 'Course are Updated Successfully . . .  . .'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Not Updated'})
    }
}

export const deleteCourse = async (req, res) => {
    const {courseId} = req.params
    try {
        const course = await Course.findOneAndDelete({
            _id: courseId
        })
        if(!course) {
            return res.status(400).json({message: "Course not found"})
        }
        res.status(200).json({message: 'Course deleted Successfully . . . . '})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Deleted Successfully . . . . . '})
    }
}

export const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({})
        if(!courses) {
            return res.status(400).json({message: "Courses are not found"})
        }
        res.status(200).json({courses})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error for getting course . . . . . '})
    }
}

export const courseDetails = async (req, res) => {
    const {courseId} = req.params;
    try {
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({ error : 'Course not found'})
        }
        res.status(201).json({ course})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error In Course Details . . . . . '})
    }
}