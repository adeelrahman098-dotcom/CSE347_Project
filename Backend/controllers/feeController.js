const feeModel = require('../models/feeModel')

const getFees = async (req, res) => {
    try {
        const fees = await feeModel.getAllFees()

        res.json({
            success: true,
            data: fees
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch fees'
        })
    }
}

const getFeeById = async (req, res) => {
    try {
        const fee = await feeModel.getFeeById(req.params.id)

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: 'Fee not found'
            })
        }

        res.json({
            success: true,
            data: fee
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch fee'
        })
    }
}

module.exports = {
    getFees,
    getFeeById
}