const store= require('./store')
const imageService = require('./image/service')
const chatController = require('../chat/controller')
const myError = require('../../libs/myError')

async function createMessage(from, data, file, fileComing){
    const chat = await chatController.validateChatId(data.chatId)
    const { message } = data
    const to = chat.users.find(user => JSON.stringify(user) !== JSON.stringify(from))

    if(fileComing){
        return createMessageWithFile(file, from, to, message, chat._id)
    }else{
        return store.addMessage({
            chatId: chat._id,
            from,
            to,
            message
        })
    }
}

async function createMessageWithFile(file, from, to, message = '', chatId){
    if(!file){
        throw myError('File is required', 400)
    }
    
    if(!message) message = ' '
    
    const image = await imageService.uploadImage(file)
    return store.addMessage({
        chatId,
        from,
        to,
        message,
        image
    })
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


module.exports = {
    createMessage,
    getMessages,
    readMessages
}