const teacherModel = require('../models/teacherModel')

const getTeachers = async (req, res) => {
    try {
        const teachers = await teacherModel.getAllTeachers()

        res.json({
            success: true,
            data: teachers
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch teachers'
        })
    }
}

const getTeacher = async (req, res) => {
    try {
        const teacher = await teacherModel.getTeacherById(req.params.id)

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            })
        }

        res.json({
            success: true,
            data: teacher
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher'
        })
    }
}

const getTeacherSummary = async (req, res) => {
    try {
        const summary = await teacherModel.getTeacherSummary(req.params.id)

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
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
            message: 'Failed to fetch teacher summary'
        })
    }
}

const getTeacherExams = async (req, res) => {
    try {
        const exams = await teacherModel.getTeacherExams(req.params.id)

        res.json({
            success: true,
            data: exams
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher exams'
        })
    }
}

const getTeacherDoubts = async (req, res) => {
    try {
        const doubts = await teacherModel.getTeacherDoubts(req.params.id)

        res.json({
            success: true,
            data: doubts
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher doubts'
        })
    }
}

module.exports = {
    getTeachers,
    getTeacher,
    getTeacherSummary,
    getTeacherExams,
    getTeacherDoubts
}