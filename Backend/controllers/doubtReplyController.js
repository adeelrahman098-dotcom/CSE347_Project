const doubtReplyModel = require('../models/doubtReplyModel')

const getDoubtReplies = async (req, res) => {
    try {
        const replies = await doubtReplyModel.getAllDoubtReplies()

        res.json({
            success: true,
            data: replies
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch doubt replies'
        })
    }
}

const getDoubtReplyById = async (req, res) => {
    try {
        const reply = await doubtReplyModel.getDoubtReplyById(
            req.params.id
        )

        if (!reply) {
            return res.status(404).json({
                success: false,
                message: 'Doubt reply not found'
            })
        }

        res.json({
            success: true,
            data: reply
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch doubt reply'
        })
    }
}

module.exports = {
    getDoubtReplies,
    getDoubtReplyById
}