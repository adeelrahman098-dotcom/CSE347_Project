const router = require('express').Router()
const { requestRegistration, getRegistrationRequests, approveRegistration } = require('../controllers/registrationController')
const { authenticate, authorize } = require('../middleware/auth')
router.post('/', requestRegistration)
router.get('/', authenticate, authorize('ADMIN'), getRegistrationRequests)
router.post('/:id/approve', authenticate, authorize('ADMIN'), approveRegistration)
module.exports = router
