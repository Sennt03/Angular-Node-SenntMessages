const store = require('./store')
const myError = require('../../libs/myError')
const userController = require('../user/controller')
const messageModel = require('../messages/model')

async function validateChatId(id){
    try{
        const chat = await store.getChat(id)
        if(chat){
            // store.updateChat(chat._id, { updatedAt: new Date() }).then(res => chat._doc.updatedAt = res.updatedAt)
            return chat
        }else{
            throw myError('Chat does not exist', 400)
        }
    }catch(err){
        throw myError('Chat does not exist', 400)
    }
}

async function getChatByUsers(users, create = false){
    if(!users || !Array.isArray(users)){
        throw myError('Users invalids', 400)
    }

    await userController.validTo(users[1])

    const existChat = await store.findOne({ users })
    if(existChat){
        return existChat
    }else if(!existChat && create){
        return await store.add({ users })
    }

}

async function getAll(userId){
    const chats = await store.getChats(userId)
    const lastMessages = await getLastMessage(chats)
    
    const messagesCount = []
    chats.forEach((chat, index) => {
        chat._doc.lastMessage = lastMessages[index]
        messagesCount.push(getNoRead(chat._id, userId))
    });

    const noRead = await Promise.all(messagesCount)
    chats.forEach((chat, index) => {
        chat._doc.noRead = noRead[index]
    });

    return chats
}

async function getLastMessage(chats){
    const chatsIds = chats.map(chat => chat._id)

    const messages = []
    for (let i = 0; i < chatsIds.length; i++) {
        messages.push(messageModel.findOne({chatId: chatsIds[i]}).sort({$natural: -1}))
    }

    return await Promise.all(messages)
}

function getNoRead(chatId, userId){
    const messages = messageModel.find({$and: [{chatId}, {to: userId}, {read: false}]})
    return messages.count()
}

async function getOtherUserByChatId(chatId, myId){
    const users = await store.getUsersByChatId(chatId)
    const otherUser = users.users.filter(user => JSON.stringify(user._id) != JSON.stringify(myId))[0]
    return otherUser
}

module.exports = {
    validateChatId,
    getChatByUsers,
    getAll,
    getOtherUserByChatId
}