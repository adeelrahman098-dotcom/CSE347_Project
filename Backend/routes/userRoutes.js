const express = require('express')

const {
    getUsers,
    getUser,
    loginUser
} = require('../controllers/userController')

const router = express.Router()

// Login user
router.post('/login', loginUser)

// Get all users
router.get('/', getUsers)

// Get user by ID
router.get('/:id', getUser)

module.exports = router