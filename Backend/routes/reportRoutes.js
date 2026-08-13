const express = require('express')

const {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require('../controllers/reportController')

const router = express.Router()

// Get all reports
router.get('/', getReports)

// Get report by ID
router.get('/:id', getReportById)

// Create a new report
router.post('/', createReport)

// Update an existing report
router.put('/:id', updateReport)

// Delete an existing report
router.delete('/:id', deleteReport)

module.exports = router