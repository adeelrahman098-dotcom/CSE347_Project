const bcrypt = require('bcryptjs')
const registrationModel = require('../models/registrationModel')
const requestRegistration = async (req, res, next) => {
    try {
        const { full_name, house_address, email, mobile_number, password, requested_role, identification_number, class_name } = req.body
        if (!full_name || !mobile_number || !password || !requested_role || !identification_number) return res.status(400).json({ success: false, message: 'Complete all required fields' })
        if (!['STUDENT', 'TEACHER', 'PARENT'].includes(requested_role)) return res.status(400).json({ success: false, message: 'Invalid requested role' })
        if (password.length < 8) return res.status(400).json({ success: false, message: 'Password must have at least 8 characters' })
        if (requested_role === 'STUDENT' && !class_name) return res.status(400).json({ success: false, message: 'Class is required for students' })
        await registrationModel.createRequest({ full_name, house_address, email, mobile_number, password_hash: await bcrypt.hash(password, 12), requested_role, identification_number, class_name })
        res.status(201).json({ success: true, message: 'Registration request submitted. An administrator must approve it before you can log in.' })
    } catch (error) { next(error) }
}
const getRegistrationRequests = async (req, res, next) => { try { res.json({ success: true, data: await registrationModel.getRequests() }) } catch (error) { next(error) } }
const approveRegistration = async (req, res, next) => { try { await registrationModel.approveRequest(req.params.id, req.user.user_id); res.json({ success: true, message: 'Account approved and created successfully' }) } catch (error) { if (error.status) return res.status(error.status).json({ success: false, message: error.message }); next(error) } }
module.exports = { requestRegistration, getRegistrationRequests, approveRegistration }
