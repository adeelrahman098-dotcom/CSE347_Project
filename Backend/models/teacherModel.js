const db = require('../config/db')

const getAllTeachers = async () => {
    const [rows] = await db.query(`
        SELECT
            t.teacher_id,
            t.user_id,
            t.teacher_code,
            t.subject,
            u.full_name,
            u.email,
            u.mobile_number
        FROM teachers t
        JOIN users u
            ON t.user_id = u.user_id
    `)

    return rows
}

const getTeacherById = async (teacherId) => {
    const [rows] = await db.query(`
        SELECT
            t.teacher_id,
            t.user_id,
            t.teacher_code,
            t.subject,
            u.full_name,
            u.email,
            u.mobile_number
        FROM teachers t
        JOIN users u
            ON t.user_id = u.user_id
        WHERE t.teacher_id = ?
    `, [teacherId])

    return rows[0]
}

const getTeacherSummary = async (teacherId) => {
    const teacher = await getTeacherById(teacherId)

    if (!teacher) {
        return null
    }

    const [examRows] = await db.query(`
        SELECT
            COUNT(*) AS total_exams,
            COUNT(DISTINCT course_id) AS total_courses
        FROM exams
        WHERE teacher_id = ?
    `, [teacherId])

    const [doubtRows] = await db.query(`
        SELECT
            COUNT(*) AS total_doubts,
            SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_doubts,
            SUM(CASE WHEN status = 'RESOLVED' THEN 1 ELSE 0 END) AS resolved_doubts
        FROM doubts
        WHERE teacher_id = ?
    `, [teacherId])

    const [examList] = await db.query(`
        SELECT
            e.exam_id,
            e.exam_title,
            e.exam_type,
            e.exam_date,
            e.total_marks,
            c.course_name
        FROM exams e
        LEFT JOIN courses c ON e.course_id = c.course_id
        WHERE e.teacher_id = ?
        ORDER BY e.exam_date DESC
        LIMIT 5
    `, [teacherId])

    const [doubtList] = await db.query(`
        SELECT
            d.doubt_id,
            d.doubt_text,
            d.status,
            d.created_at,
            u.full_name AS student_name
        FROM doubts d
        JOIN students s ON d.student_id = s.student_id
        JOIN users u ON s.user_id = u.user_id
        WHERE d.teacher_id = ?
        ORDER BY d.created_at DESC
        LIMIT 5
    `, [teacherId])

    return {
        teacher,
        stats: {
            total_exams: Number(examRows[0].total_exams) || 0,
            total_courses: Number(examRows[0].total_courses) || 0,
            total_doubts: Number(doubtRows[0].total_doubts) || 0,
            pending_doubts: Number(doubtRows[0].pending_doubts) || 0,
            resolved_doubts: Number(doubtRows[0].resolved_doubts) || 0
        },
        recent_exams: examList,
        recent_doubts: doubtList
    }
}

const getTeacherExams = async (teacherId) => {
    const [rows] = await db.query(`
        SELECT
            e.*,
            c.course_name,
            c.course_code
        FROM exams e
        LEFT JOIN courses c ON e.course_id = c.course_id
        WHERE e.teacher_id = ?
        ORDER BY e.exam_date DESC
    `, [teacherId])

    return rows
}

const getTeacherDoubts = async (teacherId) => {
    const [rows] = await db.query(`
        SELECT
            d.*,
            u.full_name AS student_name,
            s.student_code
        FROM doubts d
        JOIN students s ON d.student_id = s.student_id
        JOIN users u ON s.user_id = u.user_id
        WHERE d.teacher_id = ?
        ORDER BY d.created_at DESC
    `, [teacherId])

    return rows
}

module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeacherSummary,
    getTeacherExams,
    getTeacherDoubts
}