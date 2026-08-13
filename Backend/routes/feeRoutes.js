const express = require('express')

const {
    getFees,
    getFeeById
} = require('../controllers/feeController')

const router = express.Router()

router.get('/', getFees)

router.get('/:id', getFeeById)

module.exports = router