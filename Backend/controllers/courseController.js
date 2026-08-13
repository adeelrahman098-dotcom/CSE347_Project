const courseModel = require('../models/courseModel')

const getCourses = async (req, res) => {
    try {
        const courses = await courseModel.getAllCourses()

        res.json({
            success: true,
            data: courses
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses'
        })
    }
}

const getCourse = async (req, res) => {
    try {
        const course = await courseModel.getCourseById(req.params.id)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        res.json({
            success: true,
            data: course
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch course'
        })
    }
}

// Create a new course
const createCourse = async (req, res) => {
    try {
        const courseId = await courseModel.createCourse(req.body)

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course_id: courseId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create course'
        })
    }
}

// Update an existing course
const updateCourse = async (req, res) => {
    try {
        const affectedRows = await courseModel.updateCourse(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        res.json({
            success: true,
            message: 'Course updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update course'
        })
    }
}

// Delete an existing course
const deleteCourse = async (req, res) => {
    try {
        const affectedRows = await courseModel.deleteCourse(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        res.json({
            success: true,
            message: 'Course deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete course'
        })
    }
}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}