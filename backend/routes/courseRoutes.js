import express from 'express'
import { buyCourses, courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from '../courseController/courseController.js'
import { protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/create', createCourse)
router.put('/update/:courseId', updateCourse)
router.delete('/delete/:courseId', deleteCourse)
router.get('/courses', getCourse)
router.get('/:courseId', courseDetails)

router.post('/buy/:courseId', protect, buyCourses)

export default router