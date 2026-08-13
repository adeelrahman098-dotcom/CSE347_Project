const express = require('express')

const {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController')

const router = express.Router()

// Get all questions
router.get('/', getQuestions)

// Get question by ID
router.get('/:id', getQuestionById)

// Create a new question
router.post('/', createQuestion)

// Update an existing question
router.put('/:id', updateQuestion)

// Delete an existing question
router.delete('/:id', deleteQuestion)

module.exports = router