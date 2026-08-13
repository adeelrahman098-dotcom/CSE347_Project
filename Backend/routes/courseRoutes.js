const express = require('express')

const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController')

const router = express.Router()

// Get all courses
router.get('/', getCourses)

// Get course by ID
router.get('/:id', getCourse)

// Create a new course
router.post('/', createCourse)

// Update an existing course
router.put('/:id', updateCourse)

// Delete an existing course
router.delete('/:id', deleteCourse)

module.exports = router