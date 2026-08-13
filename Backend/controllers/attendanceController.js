const attendanceModel = require('../models/attendanceModel')

const getAttendance = async (req, res) => {
    try {
        const studentId = req.query.student_id || null
        const attendance = await attendanceModel.getAllAttendance(studentId)

        res.json({
            success: true,
            data: attendance
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance'
        })
    }
}

const getAttendanceById = async (req, res) => {
    try {
        const attendance = await attendanceModel.getAttendanceById(
            req.params.id
        )

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            })
        }

        res.json({
            success: true,
            data: attendance
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance record'
        })
    }
}

module.exports = {
    getAttendance,
    getAttendanceById
}