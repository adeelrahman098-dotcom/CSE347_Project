const db = require('../config/db')

const getAllQuestions = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM questions
    `)

    return rows
}

const getQuestionById = async (questionId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM questions
        WHERE question_id = ?
    `, [questionId])

    return rows[0]
}

// Create a new question
const createQuestion = async (questionData) => {
    const {
        exam_id,
        question_text,
        question_type,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        marks
    } = questionData

    const [result] = await db.query(`
        INSERT INTO questions
        (
            exam_id,
            question_text,
            question_type,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            marks
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        exam_id,
        question_text,
        question_type,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        marks
    ])

    return result.insertId
}

// Update an existing question
const updateQuestion = async (questionId, questionData) => {
    const {
        exam_id,
        question_text,
        question_type,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        marks
    } = questionData

    const [result] = await db.query(`
        UPDATE questions
        SET
            exam_id = ?,
            question_text = ?,
            question_type = ?,
            option_a = ?,
            option_b = ?,
            option_c = ?,
            option_d = ?,
            correct_answer = ?,
            marks = ?
        WHERE question_id = ?
    `, [
        exam_id,
        question_text,
        question_type,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        marks,
        questionId
    ])

    return result.affectedRows
}

// Delete an existing question
const deleteQuestion = async (questionId) => {
    const [result] = await db.query(`
        DELETE FROM questions
        WHERE question_id = ?
    `, [questionId])

    return result.affectedRows
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}