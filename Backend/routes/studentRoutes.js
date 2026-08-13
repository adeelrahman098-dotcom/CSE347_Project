const express = require('express')

const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentDashboard,
    getStudentSummary
} = require('../controllers/studentController')

const router = express.Router()

// Get all students
router.get('/', getStudents)

// Get student dashboard
router.get('/:id/dashboard', getStudentDashboard)

// Get student summary
router.get('/:id/summary', getStudentSummary)

// Get student by ID
router.get('/:id', getStudent)

// Create a new student
router.post('/', createStudent)

// Update an existing student
router.put('/:id', updateStudent)

// Delete an existing student
router.delete('/:id', deleteStudent)

module.exports = router