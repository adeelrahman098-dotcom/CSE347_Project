const db = require('../config/db')

const createRequest = async ({ full_name, house_address, email, mobile_number, password_hash, requested_role, identification_number, class_name }) => {
    const [result] = await db.query(`INSERT INTO registration_requests (full_name, house_address, email, mobile_number, password_hash, requested_role, identification_number, class_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [full_name, house_address || null, email || null, mobile_number, password_hash, requested_role, identification_number, class_name || null])
    return result.insertId
}
const getRequests = async () => (await db.query('SELECT registration_id, full_name, house_address, email, mobile_number, requested_role, identification_number, class_name, status, created_at FROM registration_requests ORDER BY created_at DESC'))[0]
const approveRequest = async (registrationId, adminUserId) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        const [requests] = await connection.query('SELECT * FROM registration_requests WHERE registration_id = ? FOR UPDATE', [registrationId])
        const request = requests[0]
        if (!request) throw Object.assign(new Error('Registration request not found'), { status: 404 })
        if (request.status !== 'PENDING') throw Object.assign(new Error('This request has already been processed'), { status: 409 })
        const [created] = await connection.query('INSERT INTO users (full_name, house_address, email, mobile_number, password, role) VALUES (?, ?, ?, ?, ?, ?)', [request.full_name, request.house_address, request.email, request.mobile_number, request.password_hash, request.requested_role])
        if (request.requested_role === 'STUDENT') await connection.query('INSERT INTO students (user_id, student_code, class_name) VALUES (?, ?, ?)', [created.insertId, request.identification_number, request.class_name || 'Unassigned'])
        else if (request.requested_role === 'TEACHER') await connection.query('INSERT INTO teachers (user_id, teacher_code, subject) VALUES (?, ?, ?)', [created.insertId, request.identification_number, 'Unassigned'])
        else await connection.query('INSERT INTO parents (user_id, parent_code) VALUES (?, ?)', [created.insertId, request.identification_number])
        await connection.query("UPDATE registration_requests SET status = 'APPROVED', approved_by = ?, approved_at = NOW() WHERE registration_id = ?", [adminUserId, registrationId])
        await connection.commit()
    } catch (error) { await connection.rollback(); throw error } finally { connection.release() }
}
module.exports = { createRequest, getRequests, approveRequest }
