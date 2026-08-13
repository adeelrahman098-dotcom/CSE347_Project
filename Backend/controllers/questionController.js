const questionModel = require('../models/questionModel')

const getQuestions = async (req, res) => {
    try {
        const questions = await questionModel.getAllQuestions()

        res.json({
            success: true,
            data: questions
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions'
        })
    }
}

const getQuestionById = async (req, res) => {
    try {
        const question = await questionModel.getQuestionById(req.params.id)

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            })
        }

        res.json({
            success: true,
            data: question
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch question'
        })
    }
}

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const questionId = await questionModel.createQuestion(req.body)

        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            question_id: questionId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create question'
        })
    }
}
// Update an existing question
const updateQuestion = async (req, res) => {
    try {
        const affectedRows = await questionModel.updateQuestion(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            })
        }

        res.json({
            success: true,
            message: 'Question updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update question'
        })
    }
}

// Delete an existing question
const deleteQuestion = async (req, res) => {
    try {
        const affectedRows = await questionModel.deleteQuestion(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            })
        }

        res.json({
            success: true,
            message: 'Question deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete question'
        })
    }
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}