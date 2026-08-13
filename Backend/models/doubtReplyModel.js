const db = require('../config/db')

const getAllDoubtReplies = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM doubt_replies
    `)

    return rows
}

const getDoubtReplyById = async (replyId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM doubt_replies
        WHERE reply_id = ?
    `, [replyId])

    return rows[0]
}

module.exports = {
    getAllDoubtReplies,
    getDoubtReplyById
}