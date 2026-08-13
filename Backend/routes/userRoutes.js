const express = require('express')

const {
    getUsers,
    getUser,
    loginUser,
    changePassword
} = require('../controllers/userController')
const { authenticate, authorize } = require('../middleware/auth')

const router = express.Router()

// Login user
router.post('/login', loginUser)
router.put('/me/password', authenticate, changePassword)

// Get all users
router.get('/', authenticate, authorize('ADMIN'), getUsers)

// Get user by ID
router.get('/:id', authenticate, getUser)

module.exports = router
