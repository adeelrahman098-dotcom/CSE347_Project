require('dotenv').config()

const express = require('express')
const cors = require('cors')

const db = require('./config/db')

const healthRoutes = require('./routes/healthRoutes')
const userRoutes = require('./routes/userRoutes')
const studentRoutes = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const courseRoutes = require('./routes/courseRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const examRoutes = require('./routes/examRoutes')
const resultRoutes = require('./routes/resultRoutes')
const parentRoutes = require('./routes/parentRoutes')
const doubtRoutes = require('./routes/doubtRoutes')
const doubtReplyRoutes = require('./routes/doubtReplyRoutes')
const academicHealthScoreRoutes = require('./routes/academicHealthScoreRoutes')
const feeRoutes = require('./routes/feeRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const questionRoutes = require('./routes/questionRoutes')
const reportRoutes = require('./routes/reportRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Home route
app.get('/', async (req, res) => {
    try {
        await db.query('SELECT 1 AS test')

        res.json({
            success: true,
            message: 'ICCMS Backend Server is running!',
            database: 'MySQL connected'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Database connection failed'
        })
    }
})

// API routes
app.use('/api/health', healthRoutes)
app.use('/api/users', userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/parents', parentRoutes)
app.use('/api/doubts', doubtRoutes)
app.use('/api/doubt-replies', doubtReplyRoutes)
app.use('/api/academic-health-scores', academicHealthScoreRoutes)
app.use('/api/fees', feeRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/admin', adminRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`ICCMS Backend Server running on http://localhost:${PORT}`)
})