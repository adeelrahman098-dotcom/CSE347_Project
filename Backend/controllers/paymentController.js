const paymentModel = require('../models/paymentModel')

const getPayments = async (req, res) => {
    try {
        const payments = await paymentModel.getAllPayments()

        res.json({
            success: true,
            data: payments
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch payments'
        })
    }
}

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentModel.getPaymentById(req.params.id)

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        res.json({
            success: true,
            data: payment
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment'
        })
    }
}

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const paymentId = await paymentModel.createPayment(req.body)

        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            payment_id: paymentId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create payment'
        })
    }
}

// Update an existing payment
const updatePayment = async (req, res) => {
    try {
        const affectedRows = await paymentModel.updatePayment(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        res.json({
            success: true,
            message: 'Payment updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update payment'
        })
    }
}

// Delete an existing payment
const deletePayment = async (req, res) => {
    try {
        const affectedRows = await paymentModel.deletePayment(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }

        res.json({
            success: true,
            message: 'Payment deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete payment'
        })
    }
}

module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}