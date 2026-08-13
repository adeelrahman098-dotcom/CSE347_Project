const express = require('express')

const {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController')

const router = express.Router()

// Get all payments
router.get('/', getPayments)

// Get payment by ID
router.get('/:id', getPaymentById)

// Create a new payment
router.post('/', createPayment)

// Update an existing payment
router.put('/:id', updatePayment)

// Delete an existing payment
router.delete('/:id', deletePayment)

module.exports = router