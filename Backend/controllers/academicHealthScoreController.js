const academicHealthScoreModel = require('../models/academicHealthScoreModel')

const getAcademicHealthScores = async (req, res) => {
    try {
        const scores =
            await academicHealthScoreModel.getAllAcademicHealthScores()

        res.json({
            success: true,
            data: scores
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch academic health scores'
        })
    }
}

const getAcademicHealthScoreById = async (req, res) => {
    try {
        const score =
            await academicHealthScoreModel.getAcademicHealthScoreById(
                req.params.id
            )

        if (!score) {
            return res.status(404).json({
                success: false,
                message: 'Academic health score not found'
            })
        }

        res.json({
            success: true,
            data: score
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch academic health score'
        })
    }
}

module.exports = {
    getAcademicHealthScores,
    getAcademicHealthScoreById
}