const express = require('express')

const {
    getAttendance,
    getAttendanceById
} = require('../controllers/attendanceController')

const router = express.Router()

router.get('/', getAttendance)

router.get('/:id', getAttendanceById)

module.exports = router