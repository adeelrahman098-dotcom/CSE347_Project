const db = require('../config/db')

const getAdminSummary = async () => {
    const [counts] = await db.query(`
        SELECT
            (SELECT COUNT(*) FROM students) AS total_students,
            (SELECT COUNT(*) FROM teachers) AS total_teachers,
            (SELECT COUNT(*) FROM parents) AS total_parents,
            (SELECT COUNT(*) FROM courses) AS total_courses,
            (SELECT COUNT(*) FROM exams) AS total_exams,
            (SELECT COUNT(*) FROM doubts WHERE status = 'PENDING') AS pending_doubts,
            (SELECT COUNT(*) FROM users) AS total_users,
            (SELECT COALESCE(SUM(amount), 0) FROM fees WHERE status != 'PAID') AS unpaid_fees
    `)

    const [recentStudents] = await db.query(`
        SELECT
            s.student_id,
            s.student_code,
            s.class_name,
            u.full_name,
            u.email
        FROM students s
        JOIN users u ON s.user_id = u.user_id
        ORDER BY s.student_id DESC
        LIMIT 5
    `)

    return {
        counts: counts[0],
        recent_students: recentStudents
    }
}

module.exports = {
    getAdminSummary
}
