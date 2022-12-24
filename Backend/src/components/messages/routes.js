const router = require('express').Router()
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const { newMsgValidator, newImageValidator, scheduleMessageValidator, newMsgMultipleValidator, newTranslateValidator } = require('./validators')
const controller = require('./controller')
const userController = require('../user/controller')
const Events = require('../../socket/classes/Events')
const events = require('../../socket/events/events')
const { translateMessages } = require('../../libs/translate')

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
        Events.emitMe(events.NEW_MESSAGE, req.headers?.socketid, req.user._id, newMessage)
        response(req, res, newMessage, 201)
    }catch(err){
        next(err)
    }
})

router.post('/sendFile', verifyToken, newImageValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    const file = req.files?.file
    const isAudio = req.body?.isAudio
    if(isAudio && file){
        file.name = `audio.ogg`
        file.mimetype = 'audio/ogg'
        file.time = isAudio
    }
    try{
        const newMessage = await controller.createMessage(userId, req.body, file, true)
        newMessage._doc.userFrom = await userController.getUser(newMessage.from)
        Events.emitTo(events.NEW_MESSAGE, newMessage.to, newMessage)
        Events.emitMe(events.NEW_MESSAGE, req.headers?.socketid, req.user._id, newMessage)
        response(req, res, newMessage, 201)
    }catch(err){
        next(err)
    }
})

router.post('/sendMultiple', verifyToken, newMsgMultipleValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    const file = req.files?.file
    const fileComing = file ? true : false
    const isAudio = req.body?.isAudio
    if(isAudio && file){
        file.name = `audio.ogg`
        file.mimetype = 'audio/ogg'
        file.time = isAudio
    }
    try{
        const newMessages = await controller.createMessageMultiple(userId, req.body, file, fileComing)
        newMessages.forEach(newMessage => {
            newMessage._doc.userFrom = req.user
            Events.emitTo(events.NEW_MESSAGE, newMessage.to, newMessage)
            Events.emitMe(events.NEW_MESSAGE, req.headers?.socketid, req.user._id, newMessage)
        });
        response(req, res, newMessages, 201)
    }catch(err){
        next(err)
    }
})

router.get('/readMessages/:chatId', verifyToken, async (req, res, next) => {
    const { chatId } = req.params
    try{
        const messages = await controller.readMessages(chatId, req.user._id)
        Events.emitTo(events.READ_MESSAGES, messages[0]?._id, {chatId})
        Events.emitMe(events.READ_MESSAGES, req.headers?.socketid, req.user._id, {chatId})
        response(req, res, {chatId})
    }catch(err){
        next(err)
    }
})

router.get('/deleteMyMessage/:messageId', verifyToken, async (req, res, next) => {
    const { messageId } = req.params
    try{
        const message = await controller.deleteMessage(messageId, req.user._id)
        Events.emitTo(events.MESSAGE_DELETED, message.to, message)
        Events.emitMe(events.MESSAGE_DELETED, req.headers?.socketid, req.user._id, message)
        response(req, res, message)
    }catch(err){
        next(err)
    }
})

router.get('/getSchedules', verifyToken, async (req, res, next) => {
    const { _id: userId } = req.user
    try{
        const schedules = await controller.getSchedules(userId)
        response(req, res, schedules)
    }catch(err){
        next(err)
    }
})

router.post('/scheduleMessage', verifyToken, scheduleMessageValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    const file = req.files?.file
    const fileComing = file ? true : false
    const isAudio = req.body?.isAudio
    if(isAudio && file){
        file.name = `audio.ogg`
        file.mimetype = 'audio/ogg'
        file.time = isAudio
    }
    try{
        const schedule = await controller.scheduleMessage(req.body, userId, file, fileComing)
        const userTo = await userController.getUser(schedule.userTo)
        schedule._doc.userTo = userTo
        Events.emitMe(events.SCHEDULE_ADDMESSAGE, req.headers?.socketid, userId, schedule)
        response(req, res, schedule)
    }catch(err){
        next(err)
    }
})

router.delete('/deleteSchedule/:scheduleId', verifyToken, async (req, res, next) => {
    const { _id: userId } = req.user
    const { scheduleId } = req.params
    try{
        const schedule = await controller.deleteSchedule(scheduleId, userId)
        Events.emitMe(events.SCHEDULE_DELETEMESSAGE, req.headers?.socketid, userId, schedule)
        response(req, res, schedule)
    }catch(err){
        next(err)
    }
})

router.get('/downloadDoc/:messageId', verifyToken, async (req, res, next) => {
    const { _id: userId } = req.user
    const { messageId } = req.params
    try{
        const doc = await controller.downloadDoc(messageId, userId)
        res.setHeader('Content-disposition', `attachment; filename=${doc.name}`);
        res.download(doc.urlComplete)
    }catch(err){
        next(err)
    }
})

router.post('/translate', verifyToken, newTranslateValidator, async (req, res, next) => {
    const { language, messages } = req.body
    try{
        const messagesTranslated = await translateMessages(language, messages)
        response(req, res, messagesTranslated)
    }catch(err){
        next(err)
    }
})

module.exports = router