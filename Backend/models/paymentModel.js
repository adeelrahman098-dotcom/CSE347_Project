const db = require('../config/db')

const getAllPayments = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM payments
    `)

    return rows
}

const getPaymentById = async (paymentId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM payments
        WHERE payment_id = ?
    `, [paymentId])

    return rows[0]
}

// Create a new payment
const createPayment = async (paymentData) => {
    const {
        fee_id,
        student_id,
        amount,
        payment_method,
        transaction_id,
        memo_number,
        payment_status,
        payment_date
    } = paymentData

    const [result] = await db.query(`
        INSERT INTO payments
        (
            fee_id,
            student_id,
            amount,
            payment_method,
            transaction_id,
            memo_number,
            payment_status,
            payment_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        fee_id,
        student_id,
        amount,
        payment_method,
        transaction_id,
        memo_number,
        payment_status,
        payment_date
    ])

    return result.insertId
}

// Update an existing payment
const updatePayment = async (paymentId, paymentData) => {
    const {
        fee_id,
        student_id,
        amount,
        payment_method,
        transaction_id,
        memo_number,
        payment_status,
        payment_date
    } = paymentData

    const [result] = await db.query(`
        UPDATE payments
        SET
            fee_id = ?,
            student_id = ?,
            amount = ?,
            payment_method = ?,
            transaction_id = ?,
            memo_number = ?,
            payment_status = ?,
            payment_date = ?
        WHERE payment_id = ?
    `, [
        fee_id,
        student_id,
        amount,
        payment_method,
        transaction_id,
        memo_number,
        payment_status,
        payment_date,
        paymentId
    ])

    return result.affectedRows
}

// Delete an existing payment
const deletePayment = async (paymentId) => {
    const [result] = await db.query(`
        DELETE FROM payments
        WHERE payment_id = ?
    `, [paymentId])

    return result.affectedRows
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}