const examModel = require('../models/examModel')

const getExams = async (req, res) => {
    try {
        const exams = await examModel.getAllExams()

        res.json({
            success: true,
            data: exams
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch exams'
        })
    }
}

const getExamById = async (req, res) => {
    try {
        const exam = await examModel.getExamById(req.params.id)

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            })
        }

        res.json({
            success: true,
            data: exam
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch exam'
        })
    }
}

// Create a new exam
const createExam = async (req, res) => {
    try {
        const examId = await examModel.createExam(req.body)

        res.status(201).json({
            success: true,
            message: 'Exam created successfully',
            exam_id: examId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create exam'
        })
    }
}

// Update an existing exam
const updateExam = async (req, res) => {
    try {
        const affectedRows = await examModel.updateExam(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            })
        }

        res.json({
            success: true,
            message: 'Exam updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update exam'
        })
    }
}

// Delete an existing exam
const deleteExam = async (req, res) => {
    try {
        const affectedRows = await examModel.deleteExam(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            })
        }

        res.json({
            success: true,
            message: 'Exam deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete exam'
        })
    }
}

module.exports = {
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
}