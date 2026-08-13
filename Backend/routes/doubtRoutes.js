const express = require('express')

const {
    getDoubts,
    getDoubtById
} = require('../controllers/doubtController')

const router = express.Router()

router.get('/', getDoubts)

router.get('/:id', getDoubtById)

module.exports = router