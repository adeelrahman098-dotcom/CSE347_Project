const db = require('../config/db')

const getAllReports = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM reports
    `)

    return rows
}

const getReportById = async (reportId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM reports
        WHERE report_id = ?
    `, [reportId])

    return rows[0]
}

// Create a new report
const createReport = async (reportData) => {
    const {
        report_title,
        report_type,
        generated_by,
        report_data
    } = reportData

    const [result] = await db.query(`
        INSERT INTO reports
        (
            report_title,
            report_type,
            generated_by,
            report_data
        )
        VALUES (?, ?, ?, ?)
    `, [
        report_title,
        report_type,
        generated_by,
        report_data
    ])

    return result.insertId
}

// Update an existing report
const updateReport = async (reportId, reportData) => {
    const {
        report_title,
        report_type,
        generated_by,
        report_data
    } = reportData

    const [result] = await db.query(`
        UPDATE reports
        SET
            report_title = ?,
            report_type = ?,
            generated_by = ?,
            report_data = ?
        WHERE report_id = ?
    `, [
        report_title,
        report_type,
        generated_by,
        report_data,
        reportId
    ])

    return result.affectedRows
}

// Delete an existing report
const deleteReport = async (reportId) => {
    const [result] = await db.query(`
        DELETE FROM reports
        WHERE report_id = ?
    `, [reportId])

    return result.affectedRows
}

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
}