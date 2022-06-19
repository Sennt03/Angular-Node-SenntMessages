const router = require('express').Router()
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const { newMsgValidator, newImageValidator } = require('./validators')
const controller = require('./controller')
const userController = require('../user/controller')
const Events = require('../../socket/classes/Events')
const events = require('../../socket/events/events')

router.get('/getAll/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const messages = await controller.getMessages(req.user._id, chatId)
        response(req, res, messages)
    }catch(err){
        next(err)
    }
})

router.post('/send', verifyToken, newMsgValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    try{
        const newMessage = await controller.createMessage(userId, req.body)
        newMessage._doc.userFrom = await userController.getUser(newMessage.from)
        Events.emitTo(events.NEW_MESSAGE, newMessage.to, newMessage)
        response(req, res, newMessage, 201)
    }catch(err){
        next(err)
    }
})

router.post('/sendFile', verifyToken, newImageValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    const file = req.files['file']
    try{
        const newMessage = await controller.createMessage(userId, req.body, file, true)
        newMessage._doc.userFrom = await userController.getUser(newMessage.from)
        Events.emitTo(events.NEW_MESSAGE, newMessage.to, newMessage)
        response(req, res, newMessage, 201)
    }catch(err){
        next(err)
    }
})

router.get('/readMessages/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const messages = await controller.readMessages(chatId, req.user._id)
        Events.emitTo(events.READ_MESSAGES, messages[0]?._id, {chatId})
        response(req, res, {chatId})
    }catch(err){
        next(err)
    }
})

module.exports = router