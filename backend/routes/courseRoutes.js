import express from 'express'
import { courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from '../courseController/courseController.js'

const router = express.Router()

router.post('/create', createCourse)
router.put('/update/:courseId', updateCourse)
router.delete('/delete/:courseId', deleteCourse)
router.get('/courses', getCourse)
router.get('/:courseId', courseDetails)

export default router