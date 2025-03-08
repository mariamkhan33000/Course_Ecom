import express from 'express'
import { createCourse } from '../courseController/courseController.js'

const router = express.Router()

router.post('/create', createCourse)

export default router