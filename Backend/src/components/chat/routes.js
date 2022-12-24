const router = require('express').Router()
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const controller = require('./controller')
const { newChatValidator } = require('./validators')
const Events = require('../../socket/classes/Events')
const events = require('../../socket/events/events')

router.get('/', verifyToken, async (req, res, next) => {
    try{
        const chat = await controller.getAll(req.user._id)
        response(req, res, chat, 201)
    }catch(err){
        next(err)
    }
})

router.get('/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const chat = await controller.getChatById(chatId, req.user._id)
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

router.get('/block/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const chat = await controller.blockChat(chatId, req.user._id)
        Events.emitTo(events.CHAT_BLOCKED, chat.blocked.to, chat)
        response(req, res, chat, 200)
    }catch(err){
        next(err)
    }
})

router.get('/unlock/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const chat = await controller.unlockChat(chatId, req.user._id)
        const to = chat.users.filter(user => JSON.stringify(user) != JSON.stringify(req.user._id))[0]
        Events.emitTo(events.CHAT_UNLOCKED, to, chat)
        response(req, res, chat, 200)
    }catch(err){
        next(err)
    }
})


module.exports = router