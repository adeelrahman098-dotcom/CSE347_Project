const db = require('../config/db')

const getAllUsers = async () => {
    const [rows] = await db.query(
        `SELECT
            user_id,
            full_name,
            email,
            mobile_number,
            role,
            created_at
        FROM users`
    )

    return rows
}


const getUserById = async (userId) => {
    const [rows] = await db.query(
        `SELECT
            user_id,
            full_name,
            email,
            mobile_number,
            role,
            created_at
        FROM users
        WHERE user_id = ?`,
        [userId]
    )

    return rows[0]
}


// Get user by email for login
const getUserByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT
            u.user_id,
            u.full_name,
            u.email,
            u.mobile_number,
            u.password,
            u.role,
            u.created_at,
            s.student_id,
            t.teacher_id,
            p.parent_id,
            p.student_id AS linked_student_id
        FROM users u
        LEFT JOIN students s
            ON u.user_id = s.user_id
        LEFT JOIN teachers t
            ON u.user_id = t.user_id
        LEFT JOIN parents p
            ON u.user_id = p.user_id
        WHERE u.email = ?`,
        [email]
    )

    return rows[0]
}

const updatePassword = async (userId, password) => {
    const [result] = await db.query('UPDATE users SET password = ? WHERE user_id = ?', [password, userId])
    return result.affectedRows
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    updatePassword
}
