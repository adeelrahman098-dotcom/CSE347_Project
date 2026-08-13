const studentModel = require('../models/studentModel')

const getStudents = async (req, res) => {
    try {
        const students = await studentModel.getAllStudents()

        res.json({
            success: true,
            data: students
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch students'
        })
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await studentModel.getStudentById(req.params.id)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        res.json({
            success: true,
            data: student
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch student'
        })
    }
}

// Create a new student
const createStudent = async (req, res) => {
    try {
        const studentId = await studentModel.createStudent(req.body)

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            student_id: studentId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create student'
        })
    }
}

// Update an existing student
const updateStudent = async (req, res) => {
    try {
        const affectedRows = await studentModel.updateStudent(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        res.json({
            success: true,
            message: 'Student updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update student'
        })
    }
}

// Delete an existing student
const deleteStudent = async (req, res) => {
    try {
        const affectedRows = await studentModel.deleteStudent(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        res.json({
            success: true,
            message: 'Student deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete student'
        })
    }
}

// Get complete student dashboard information
const getStudentDashboard = async (req, res) => {
    try {
        const dashboard = await studentModel.getStudentDashboard(
            req.params.id
        )

        if (!dashboard) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        res.json({
            success: true,
            data: dashboard
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch student dashboard'
        })
    }
}

// Get student summary information
const getStudentSummary = async (req, res) => {
    try {
        const summary = await studentModel.getStudentSummary(
            req.params.id
        )

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        res.json({
            success: true,
            data: summary
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch student summary'
        })
    }
}


module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentDashboard,
    getStudentSummary
}