const db = require('../config/db')

const getAllDoubts = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM doubts
    `)

    return rows
}

const getDoubtById = async (doubtId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM doubts
        WHERE doubt_id = ?
    `, [doubtId])

    return rows[0]
}

module.exports = {
    getAllDoubts,
    getDoubtById
}