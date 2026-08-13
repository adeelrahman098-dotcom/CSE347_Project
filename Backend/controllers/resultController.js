const resultModel = require('../models/resultModel')

const getResults = async (req, res) => {
    try {
        const studentId = req.query.student_id || null
        const results = await resultModel.getAllResults(studentId)

        res.json({
            success: true,
            data: results
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch results'
        })
    }
}

const getResultById = async (req, res) => {
    try {
        const result = await resultModel.getResultById(req.params.id)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Result not found'
            })
        }

        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch result'
        })
    }
}

module.exports = {
    getResults,
    getResultById
}