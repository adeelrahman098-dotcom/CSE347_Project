const errorHandler = (error, req, res, next) => {
    console.error(error)
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'A record with those details already exists' })
    if (error.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ success: false, message: 'A related record does not exist' })
    res.status(500).json({ success: false, message: 'An unexpected server error occurred' })
}
module.exports = errorHandler
