const db = require('../config/db')


const getAllAttendance = async (studentId = null) => {
    let query = `
        SELECT
            a.attendance_id,
            a.student_id,
            a.course_id,
            c.course_name,
            c.course_code,
            a.attendance_date,
            a.status
        FROM attendance a
        LEFT JOIN courses c
            ON a.course_id = c.course_id
    `
    const params = []

    if (studentId) {
        query += ` WHERE a.student_id = ?`
        params.push(studentId)
    }

    query += ` ORDER BY a.attendance_date DESC`

    const [rows] = await db.query(query, params)

    return rows
}


// Get attendance record by ID
const getAttendanceById = async (attendanceId) => {
    const [rows] = await db.query(`
        SELECT
            a.attendance_id,
            a.student_id,
            a.course_id,
            c.course_name,
            c.course_code,
            a.attendance_date,
            a.status
        FROM attendance a
        LEFT JOIN courses c
            ON a.course_id = c.course_id
        WHERE a.attendance_id = ?
    `, [attendanceId])

    return rows[0]
}


module.exports = {
    getAllAttendance,
    getAttendanceById
}