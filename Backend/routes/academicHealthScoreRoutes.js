const express = require('express')

const {
    getAcademicHealthScores,
    getAcademicHealthScoreById
} = require('../controllers/academicHealthScoreController')

const router = express.Router()

router.get('/', getAcademicHealthScores)

router.get('/:id', getAcademicHealthScoreById)

module.exports = router