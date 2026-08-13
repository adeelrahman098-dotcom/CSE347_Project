const express = require('express')

const {
    getDoubtReplies,
    getDoubtReplyById
} = require('../controllers/doubtReplyController')

const router = express.Router()

router.get('/', getDoubtReplies)

router.get('/:id', getDoubtReplyById)

module.exports = router