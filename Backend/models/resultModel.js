const db = require('../config/db')

const getAllResults = async (studentId = null) => {
    let query = `
        SELECT
            r.*,
            e.exam_title,
            e.exam_type,
            e.exam_date
        FROM results r
        JOIN exams e ON r.exam_id = e.exam_id
    `
    const params = []

    if (studentId) {
        query += ` WHERE r.student_id = ?`
        params.push(studentId)
    }

    query += ` ORDER BY e.exam_date DESC`

    const [rows] = await db.query(query, params)

    return rows
}

const getResultById = async (resultId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM results
        WHERE result_id = ?
    `, [resultId])

    return rows[0]
}

module.exports = {
    getAllResults,
    getResultById
}