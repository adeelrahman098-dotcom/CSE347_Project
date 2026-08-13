const db = require('../config/db')

const getAllStudents = async () => {
    const [rows] = await db.query(`
        SELECT
            s.student_id,
            s.user_id,
            s.student_code,
            s.class_name,
            u.full_name,
            u.email,
            u.mobile_number
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
    `)

    return rows
}

const getStudentById = async (studentId) => {
    const [rows] = await db.query(`
        SELECT
            s.student_id,
            s.user_id,
            s.student_code,
            s.class_name,
            u.full_name,
            u.email,
            u.mobile_number
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
        WHERE s.student_id = ?
    `, [studentId])

    return rows[0]
}

// Create a new student
const createStudent = async (studentData) => {
    const {
        user_id,
        student_code,
        class_name
    } = studentData

    const [result] = await db.query(`
        INSERT INTO students
        (
            user_id,
            student_code,
            class_name
        )
        VALUES (?, ?, ?)
    `, [
        user_id,
        student_code,
        class_name
    ])

    return result.insertId
}

// Update an existing student
const updateStudent = async (studentId, studentData) => {
    const {
        user_id,
        student_code,
        class_name
    } = studentData

    const [result] = await db.query(`
        UPDATE students
        SET
            user_id = ?,
            student_code = ?,
            class_name = ?
        WHERE student_id = ?
    `, [
        user_id,
        student_code,
        class_name,
        studentId
    ])

    return result.affectedRows
}

// Delete an existing student
const deleteStudent = async (studentId) => {
    const [result] = await db.query(`
        DELETE FROM students
        WHERE student_id = ?
    `, [studentId])

    return result.affectedRows
}

// Get complete student dashboard information
const getStudentDashboard = async (studentId) => {

    // 1. Student information
    const [studentRows] = await db.query(`
        SELECT
            s.student_id,
            s.student_code,
            s.class_name,
            u.full_name,
            u.email,
            u.mobile_number
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
        WHERE s.student_id = ?
    `, [studentId])

    if (studentRows.length === 0) {
        return null
    }

    // 2. Attendance information
    const [attendanceRows] = await db.query(`
        SELECT
            a.attendance_id,
            a.course_id,
            c.course_name,
            c.course_code,
            a.attendance_date,
            a.status
        FROM attendance a
        LEFT JOIN courses c
            ON a.course_id = c.course_id
        WHERE a.student_id = ?
        ORDER BY a.attendance_date DESC
    `, [studentId])

    // 3. Result information
    const [resultRows] = await db.query(`
        SELECT
            r.result_id,
            r.exam_id,
            e.exam_title,
            e.exam_type,
            e.exam_date,
            r.total_marks,
            r.obtained_marks,
            r.grade,
            r.submitted_at
        FROM results r
        JOIN exams e
            ON r.exam_id = e.exam_id
        WHERE r.student_id = ?
        ORDER BY e.exam_date DESC
    `, [studentId])

    // 4. Fee information
    const [feeRows] = await db.query(`
        SELECT
            fee_id,
            fee_month,
            amount,
            due_date,
            status,
            invoice_number,
            created_at
        FROM fees
        WHERE student_id = ?
        ORDER BY fee_month DESC
    `, [studentId])

    // 5. Payment information
    const [paymentRows] = await db.query(`
        SELECT
            p.payment_id,
            p.fee_id,
            p.amount,
            p.payment_method,
            p.transaction_id,
            p.memo_number,
            p.payment_status,
            p.payment_date
        FROM payments p
        WHERE p.student_id = ?
        ORDER BY p.payment_date DESC
    `, [studentId])

    return {
        student: studentRows[0],
        attendance: attendanceRows,
        results: resultRows,
        fees: feeRows,
        payments: paymentRows
    }
}

// Get student summary information
const getStudentSummary = async (studentId) => {

    // 1. Check if student exists
    const [studentRows] = await db.query(`
        SELECT
            s.student_id,
            s.student_code,
            s.class_name,
            u.full_name
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
        WHERE s.student_id = ?
    `, [studentId])

    if (studentRows.length === 0) {
        return null
    }

    // 2. Calculate attendance summary
    const [attendanceRows] = await db.query(`
        SELECT
            COUNT(*) AS total_classes,
            SUM(CASE WHEN status = 'PRESENT' THEN 1 ELSE 0 END) AS present_classes,
            SUM(CASE WHEN status = 'ABSENT' THEN 1 ELSE 0 END) AS absent_classes
        FROM attendance
        WHERE student_id = ?
    `, [studentId])

    // 3. Calculate result summary
    const [resultRows] = await db.query(`
        SELECT
            COUNT(*) AS total_exams,
            COALESCE(SUM(total_marks), 0) AS total_marks,
            COALESCE(SUM(obtained_marks), 0) AS obtained_marks,
            COALESCE(AVG(obtained_marks), 0) AS average_marks
        FROM results
        WHERE student_id = ?
    `, [studentId])

    // 4. Calculate fee summary
    const [feeRows] = await db.query(`
        SELECT
            COUNT(*) AS total_fees,
            COALESCE(SUM(amount), 0) AS total_fee_amount,
            COALESCE(SUM(
                CASE WHEN status = 'PAID' THEN amount ELSE 0 END
            ), 0) AS paid_fee_amount,
            COALESCE(SUM(
                CASE WHEN status != 'PAID' THEN amount ELSE 0 END
            ), 0) AS unpaid_fee_amount
        FROM fees
        WHERE student_id = ?
    `, [studentId])

    // 5. Calculate payment summary
    const [paymentRows] = await db.query(`
        SELECT
            COUNT(*) AS total_payments,
            COALESCE(SUM(
                CASE
                    WHEN payment_status = 'SUCCESS'
                    THEN amount
                    ELSE 0
                END
            ), 0) AS successful_payment_amount
        FROM payments
        WHERE student_id = ?
    `, [studentId])

    // 6. Calculate attendance percentage
    const totalClasses = Number(attendanceRows[0].total_classes) || 0
    const presentClasses = Number(attendanceRows[0].present_classes) || 0

    const attendancePercentage =
        totalClasses > 0
            ? ((presentClasses / totalClasses) * 100).toFixed(2)
            : '0.00'

    return {
        student: studentRows[0],

        attendance: {
            total_classes: totalClasses,
            present_classes: presentClasses,
            absent_classes: Number(attendanceRows[0].absent_classes) || 0,
            attendance_percentage: attendancePercentage
        },

        academic: {
            total_exams: Number(resultRows[0].total_exams) || 0,
            total_marks: resultRows[0].total_marks,
            obtained_marks: resultRows[0].obtained_marks,
            average_marks: resultRows[0].average_marks
        },

        fees: {
            total_fees: Number(feeRows[0].total_fees) || 0,
            total_fee_amount: feeRows[0].total_fee_amount,
            paid_fee_amount: feeRows[0].paid_fee_amount,
            unpaid_fee_amount: feeRows[0].unpaid_fee_amount
        },

        payments: {
            total_payments: Number(paymentRows[0].total_payments) || 0,
            successful_payment_amount:
                paymentRows[0].successful_payment_amount
        }
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentDashboard,
    getStudentSummary
}