const db = require('../config/db')

const getAllFees = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM fees
    `)

    return rows
}

const getFeeById = async (feeId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM fees
        WHERE fee_id = ?
    `, [feeId])

    return rows[0]
}

module.exports = {
    getAllFees,
    getFeeById
}