const express = require('express')

const {
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
} = require('../controllers/examController')

const router = express.Router()

// Get all exams
router.get('/', getExams)

// Get exam by ID
router.get('/:id', getExamById)

// Create a new exam
router.post('/', createExam)

// Update an existing exam
router.put('/:id', updateExam)

// Delete an existing exam
router.delete('/:id', deleteExam)

module.exports = router