const adminModel = require('../models/adminModel')

const getAdminSummary = async (req, res) => {
    try {
        const summary = await adminModel.getAdminSummary()

        res.json({
            success: true,
            data: summary
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin summary'
        })
    }
}

module.exports = {
    getAdminSummary
}
