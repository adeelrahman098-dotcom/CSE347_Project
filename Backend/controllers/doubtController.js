const doubtModel = require('../models/doubtModel')

const getDoubts = async (req, res) => {
    try {
        const doubts = await doubtModel.getAllDoubts()

        res.json({
            success: true,
            data: doubts
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch doubts'
        })
    }
}

const getDoubtById = async (req, res) => {
    try {
        const doubt = await doubtModel.getDoubtById(req.params.id)

        if (!doubt) {
            return res.status(404).json({
                success: false,
                message: 'Doubt not found'
            })
        }

        res.json({
            success: true,
            data: doubt
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch doubt'
        })
    }
}

module.exports = {
    getDoubts,
    getDoubtById
}