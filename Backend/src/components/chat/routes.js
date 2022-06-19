const router = require('express').Router()
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const controller = require('./controller')
const { newChatValidator } = require('./validators')

router.get('/', verifyToken, async (req, res, next) => {
    try{
        const chat = await controller.getAll(req.user._id)
        response(req, res, chat, 201)
    }catch(err){
        next(err)
    }
})

router.post('/getChatId', verifyToken, newChatValidator, async (req, res, next) => {
    const { _id: from } = req.user
    const { to } = req.body
    try{
        const chat = await controller.getChatByUsers([from, to], true)
        response(req, res, chat, 201)
    }catch(err){
        next(err)
    }
})

router.get('/getFromUser/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const userFrom = await controller.getOtherUserByChatId(chatId, req.user._id)
        response(req, res, userFrom)
    }catch(err){
        next(err)
    }
})


module.exports = router