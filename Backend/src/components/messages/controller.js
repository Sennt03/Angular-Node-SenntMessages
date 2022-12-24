const store= require('./store')
const imageService = require('./image/service')
const scheduleService = require('./schedule/service')
const chatController = require('../chat/controller')
const myError = require('../../libs/myError')
const path = require('path')

async function createMessage(from, data, file, fileComing){
    const chat = await chatController.validateChatId(data.chatId)

    // VALIDATE CHAT IS NOT BLOCKED
    if(chat?.blocked?.from){
        throw myError('Can not send messages in a locked chat', 403)
    }

    const { message } = data
    const to = chat.users.find(user => JSON.stringify(user) !== JSON.stringify(from))

    if(fileComing){
        return createMessageWithFile(file, from, to, message, chat._id)
    }else{
        const newMessage = {
            chatId: chat._id,
            from,
            to,
            message
        }
        if(data?.isLocation){
            newMessage.location = data.isLocation
            newMessage.message = ' '
        }
        return store.addMessage(newMessage)
    }
}

async function createMessageWithFile(file, from, to, message = '', chatId){
    if(!file){
        throw myError('File is required', 400)
    }
    
    if(!message) message = ' '
    
    // Comprobar si es imagen o documento
    if(imageService.isImage(file.mimetype)){
        const image = await imageService.uploadImage(file)
        return store.addMessage({
            chatId,
            from,
            to,
            message,
            image
        })
    }else{
        const docUrl = imageService.uploadDoc(file)
        return store.addMessage({
            chatId,
            from,
            to,
            message,
            doc: {
                name: file.name,
                url: docUrl.url,
                mimetype: file.mimetype,
                size: file.size,
                time: file?.time
            }
        })
    }
}

function validateMultipleFile(file){
    if(!file){
        throw myError('File is required', 400)
    }
    
    if(imageService.isImage(file.mimetype)){
        return imageService.uploadImage(file)
    }else{
        return imageService.uploadDoc(file)
    }
}

async function createMultipleWithFile(image, from, to, message = '', chatId, isImage){
    if(!message) message = ' '
    const newMessage = { chatId, from, to, message }
    if(isImage){
        newMessage.image = image
    }else{
        newMessage.doc = image
    }
    return store.addMessage(newMessage)
}

async function createMessageMultiple(from, data, file, fileComing){
    const dataUsers = data.usersId

    let promisesChats = []
    dataUsers.forEach(userTo => {
        promisesChats.push(chatController.getChatByUsersPromise([from, userTo], true))
    });

    let chats
    try{
        chats = await Promise.all(promisesChats)
    }catch(err){
        throw myError('Some userId is invalid', 400)
    }

    // VALIDATE CHAT IS NOT BLOCKED
    chats.forEach(chat => {
        if(chat?.blocked?.from){
            throw myError('Can not send message, some chat is blocked.', 403)
        }
    });

    const message = data?.message
    if(!message && !fileComing && !data?.isLocation){
        throw myError('Message is required', 400)
    }
    // const to = chat.users.find(user => JSON.stringify(user) !== JSON.stringify(from))

    if(fileComing){
        const image = await validateMultipleFile(file)
        const promisesCreateFile = []
        chats.forEach(chat => {
            const toId = chat.users.filter(user => JSON.stringify(user) != JSON.stringify(from))[0]
            promisesCreateFile.push(createMultipleWithFile(image, from, toId, message, chat._id, imageService.isImage(file.mimetype)))
        });
        return Promise.all(promisesCreateFile)
    }else{
        const promisesCreateMessage = []
        chats.forEach(chat => {
            const toId = chat.users.filter(user => JSON.stringify(user) != JSON.stringify(from))[0]
            const newMessage = {
                chatId: chat._id,
                from,
                to: toId,
                message
            }
            if(data?.isLocation){
                newMessage.location = data.isLocation
                newMessage.message = ' '
            }
            promisesCreateMessage.push(store.addMessage(newMessage))
        });
        return Promise.all(promisesCreateMessage)
    }
}

async function getMessages(userId, chatId){
    let messages = await store.getMessages(chatId)
    return messages.filter(message => message.from.toString() == userId || message.to.toString() == userId)
}

function readMessages(chatId, userId){
    const promises = []
    promises.push(chatController.getOtherUserByChatId(chatId, userId))
    promises.push(store.readMessages(chatId, userId))
    return Promise.all(promises)
}

async function deleteMessage(messageId, userId){
    const deleted = await store.deleteMyMessage(messageId, userId)
    if(!deleted){
        throw myError('Unathorized to delete this message')
    }

    if(deleted?.image?.public_id){
        await imageService.deleteImage(deleted.image.public_id)
    }else if(deleted?.doc?.url){
        imageService.deleteDoc(deleted.doc.url)
    }
    return deleted
}

async function scheduleMessage(data, userId, file, fileComing){
    // Crear objeto de mensaje
    const chat = await chatController.getChatByUsers([data.userTo, userId])

    // VALIDATE CHAT IS NOT BLOCKED
    if(chat && chat?.blocked?.from){
        throw myError('Can not send messages in a locked chat', 403)
    }

    let message = data?.message
    if(!message && !fileComing && !data.isLocation){
        throw myError('Message is required', 400)
    }

    if(!message && fileComing) message = ' '

    let image = false
    let isImage = true
    if(fileComing){
        if(imageService.isImage(file.mimetype)){
            image = await imageService.uploadImage(file)
        }else{
            isImage = false
            image = imageService.uploadDoc(file)
        }
    }

    const scheduleMessage = {
        from: userId,
        to: data.userTo,
        message
    }

    if(fileComing){
        if(isImage){
            scheduleMessage.image = image
        }else{
            scheduleMessage.doc = image
        }
    }

    const dataToSchedule = {
        from: userId,
        userTo: data.userTo,
        date: data.date,
        message: scheduleMessage
    }
    
    if(data?.isLocation){
        dataToSchedule.message.location = data.isLocation
        dataToSchedule.message.message = ' '
    }

    // Crear agendado
    return scheduleService.addSchedule(dataToSchedule, data.milisegundos)
}

function getSchedules(userId){
    return scheduleService.getSchedules(userId)
}

function deleteSchedule(scheduleId, userId){
    return scheduleService.deleteSchedule(scheduleId, userId)
}

async function downloadDoc(messageId, userId){
    const message = await store.getMessageById(messageId)
    const userIdString = JSON.stringify(userId)
    if(!message || (JSON.stringify(message.from) != userIdString && JSON.stringify(message.to) != userIdString)){
        throw myError('The message does not exist')
    }
    
    if(!message?.doc || !message?.doc?.url){
        throw myError('Not a file')
    }
    const urlComplete = path.join(__dirname, '../..' + message.doc.url)
    return {
        name: message.doc.name,
        urlComplete
    }
}

module.exports = {
    createMessage,
    createMessageMultiple,
    getMessages,
    readMessages,
    deleteMessage,
    scheduleMessage,
    getSchedules,
    deleteSchedule,
    downloadDoc
}