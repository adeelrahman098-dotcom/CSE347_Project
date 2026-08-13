const reportModel = require('../models/reportModel')

const getReports = async (req, res) => {
    try {
        const reports = await reportModel.getAllReports()

        res.json({
            success: true,
            data: reports
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch reports'
        })
    }
}

const getReportById = async (req, res) => {
    try {
        const report = await reportModel.getReportById(req.params.id)

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            })
        }

        res.json({
            success: true,
            data: report
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch report'
        })
    }
}

// Create a new report
const createReport = async (req, res) => {
    try {
        const reportId = await reportModel.createReport(req.body)

        res.status(201).json({
            success: true,
            message: 'Report created successfully',
            report_id: reportId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to create report'
        })
    }
}

// Update an existing report
const updateReport = async (req, res) => {
    try {
        const affectedRows = await reportModel.updateReport(
            req.params.id,
            req.body
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            })
        }

        res.json({
            success: true,
            message: 'Report updated successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to update report'
        })
    }
}

// Delete an existing report
const deleteReport = async (req, res) => {
    try {
        const affectedRows = await reportModel.deleteReport(
            req.params.id
        )

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            })
        }

        res.json({
            success: true,
            message: 'Report deleted successfully'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to delete report'
        })
    }
}

module.exports = {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
}