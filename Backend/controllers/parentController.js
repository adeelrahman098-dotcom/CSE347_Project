const parentModel = require('../models/parentModel')

const getParents = async (req, res) => {
    try {
        const parents = await parentModel.getAllParents()

        res.json({
            success: true,
            data: parents
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch parents'
        })
    }
}

const getParentById = async (req, res) => {
    try {
        const parent = await parentModel.getParentById(req.params.id)

        if (!parent) {
            return res.status(404).json({
                success: false,
                message: 'Parent not found'
            })
        }

        res.json({
            success: true,
            data: parent
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch parent'
        })
    }
}

const getParentSummary = async (req, res) => {
    try {
        const summary = await parentModel.getParentSummary(req.params.id)

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: 'Parent not found'
            })
        }

        res.json({
            success: true,
            data: summary
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch parent summary'
        })
    }
}

module.exports = {
    getParents,
    getParentById,
    getParentSummary
}