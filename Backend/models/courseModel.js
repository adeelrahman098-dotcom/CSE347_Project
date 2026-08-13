const db = require('../config/db')

const getAllCourses = async () => {
    const [rows] = await db.query(`
        SELECT
            course_id,
            course_name,
            course_code,
            description
        FROM courses
    `)

    return rows
}

const getCourseById = async (courseId) => {
    const [rows] = await db.query(`
        SELECT
            course_id,
            course_name,
            course_code,
            description
        FROM courses
        WHERE course_id = ?
    `, [courseId])

    return rows[0]
}

// Create a new course
const createCourse = async (courseData) => {
    const {
        course_name,
        course_code,
        description
    } = courseData

    const [result] = await db.query(`
        INSERT INTO courses
        (
            course_name,
            course_code,
            description
        )
        VALUES (?, ?, ?)
    `, [
        course_name,
        course_code,
        description
    ])

    return result.insertId
}

// Update an existing course
const updateCourse = async (courseId, courseData) => {
    const {
        course_name,
        course_code,
        description
    } = courseData

    const [result] = await db.query(`
        UPDATE courses
        SET
            course_name = ?,
            course_code = ?,
            description = ?
        WHERE course_id = ?
    `, [
        course_name,
        course_code,
        description,
        courseId
    ])

    return result.affectedRows
}

// Delete an existing course
const deleteCourse = async (courseId) => {
    const [result] = await db.query(`
        DELETE FROM courses
        WHERE course_id = ?
    `, [courseId])

    return result.affectedRows
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}