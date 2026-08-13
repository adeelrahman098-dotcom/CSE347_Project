const db = require('../config/db')

const getAllParents = async () => {
    const [rows] = await db.query(`
        SELECT
            p.parent_id,
            p.user_id,
            p.parent_code,
            p.student_id,
            u.full_name,
            u.email,
            u.mobile_number,
            s.student_code,
            su.full_name AS student_name
        FROM parents p
        JOIN users u ON p.user_id = u.user_id
        LEFT JOIN students s ON p.student_id = s.student_id
        LEFT JOIN users su ON s.user_id = su.user_id
    `)

    return rows
}

const getParentById = async (parentId) => {
    const [rows] = await db.query(`
        SELECT
            p.parent_id,
            p.user_id,
            p.parent_code,
            p.student_id,
            u.full_name,
            u.email,
            u.mobile_number,
            s.student_code,
            s.class_name,
            su.full_name AS student_name
        FROM parents p
        JOIN users u ON p.user_id = u.user_id
        LEFT JOIN students s ON p.student_id = s.student_id
        LEFT JOIN users su ON s.user_id = su.user_id
        WHERE p.parent_id = ?
    `, [parentId])

    return rows[0]
}

const getParentSummary = async (parentId) => {
    const parent = await getParentById(parentId)

    if (!parent) {
        return null
    }

    if (!parent.student_id) {
        return {
            parent,
            child: null,
            message: 'No student linked to this parent account'
        }
    }

    const studentModel = require('./studentModel')
    const childSummary = await studentModel.getStudentSummary(
        parent.student_id
    )

    return {
        parent,
        child: childSummary
    }
}

module.exports = {
    getAllParents,
    getParentById,
    getParentSummary
}