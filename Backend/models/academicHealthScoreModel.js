const db = require('../config/db')

const getAllAcademicHealthScores = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM academic_health_scores
    `)

    return rows
}

const getAcademicHealthScoreById = async (ahsId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM academic_health_scores
        WHERE ahs_id = ?
    `, [ahsId])

    return rows[0]
}

module.exports = {
    getAllAcademicHealthScores,
    getAcademicHealthScoreById
}