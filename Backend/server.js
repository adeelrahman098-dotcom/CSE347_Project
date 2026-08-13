require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

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
const registrationRoutes = require('./routes/registrationRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/users/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }))

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
app.use('/api/registrations', registrationRoutes)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`ICCMS Backend Server running on http://localhost:${PORT}`)
})
