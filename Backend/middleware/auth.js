const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ success: false, message: 'Authentication is required' })
    try { req.user = jwt.verify(token, process.env.JWT_SECRET); next() }
    catch { return res.status(401).json({ success: false, message: 'Your session is invalid or has expired' }) }
}

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'You do not have permission for this action' })
    next()
}

module.exports = { authenticate, authorize }
