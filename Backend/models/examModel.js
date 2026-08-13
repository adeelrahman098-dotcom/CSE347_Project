const db = require('../config/db')

const getAllExams = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM exams
    `)

    return rows
}

const getExamById = async (examId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM exams
        WHERE exam_id = ?
    `, [examId])

    return rows[0]
}

// Create a new exam
const createExam = async (examData) => {
    const {
        course_id,
        teacher_id,
        exam_title,
        exam_type,
        exam_date,
        duration_minutes,
        total_marks
    } = examData

    const [result] = await db.query(`
        INSERT INTO exams
        (
            course_id,
            teacher_id,
            exam_title,
            exam_type,
            exam_date,
            duration_minutes,
            total_marks
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
        course_id,
        teacher_id,
        exam_title,
        exam_type,
        exam_date,
        duration_minutes,
        total_marks
    ])

    return result.insertId
}

// Update an existing exam
const updateExam = async (examId, examData) => {
    const {
        course_id,
        teacher_id,
        exam_title,
        exam_type,
        exam_date,
        duration_minutes,
        total_marks
    } = examData

    const [result] = await db.query(`
        UPDATE exams
        SET
            course_id = ?,
            teacher_id = ?,
            exam_title = ?,
            exam_type = ?,
            exam_date = ?,
            duration_minutes = ?,
            total_marks = ?
        WHERE exam_id = ?
    `, [
        course_id,
        teacher_id,
        exam_title,
        exam_type,
        exam_date,
        duration_minutes,
        total_marks,
        examId
    ])

    return result.affectedRows
}

// Delete an existing exam
const deleteExam = async (examId) => {
    const [result] = await db.query(`
        DELETE FROM exams
        WHERE exam_id = ?
    `, [examId])

    return result.affectedRows
}

module.exports = {
    getAllExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
}