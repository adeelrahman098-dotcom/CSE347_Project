const express = require('express')

const {
    getParents,
    getParentById,
    getParentSummary
} = require('../controllers/parentController')

const router = express.Router()

router.get('/', getParents)

router.get('/:id/summary', getParentSummary)

router.get('/:id', getParentById)

module.exports = router