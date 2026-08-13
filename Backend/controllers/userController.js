const userModel = require('../models/userModel')


// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers()

        res.json({
            success: true,
            data: users
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        })
    }
}


// Get user by ID
const getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            data: user
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch user'
        })
    }
}


// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check whether email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            })
        }


        // Find user by email
        const user = await userModel.getUserByEmail(email)


        // Check whether user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }


        // Compare password
        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }


        // Do not send password to frontend
        const userData = {
            user_id: user.user_id,
            student_id: user.student_id,
            teacher_id: user.teacher_id,
            parent_id: user.parent_id,
            linked_student_id: user.linked_student_id,
            full_name: user.full_name,
            email: user.email,
            mobile_number: user.mobile_number,
            role: user.role,
            created_at: user.created_at
        }


        res.json({
            success: true,
            message: 'Login successful',
            data: userData
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Login failed'
        })
    }
}


module.exports = {
    getUsers,
    getUser,
    loginUser
}