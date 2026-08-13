const express = require('express')

const {
    getResults,
    getResultById
} = require('../controllers/resultController')

const router = express.Router()

router.get('/', getResults)

router.get('/:id', getResultById)

module.exports = router