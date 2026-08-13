const express = require('express')

const {
    getTeachers,
    getTeacher,
    getTeacherSummary,
    getTeacherExams,
    getTeacherDoubts
} = require('../controllers/teacherController')

const router = express.Router()

router.get('/', getTeachers)

router.get('/:id/summary', getTeacherSummary)

router.get('/:id/exams', getTeacherExams)

router.get('/:id/doubts', getTeacherDoubts)

router.get('/:id', getTeacher)

module.exports = router