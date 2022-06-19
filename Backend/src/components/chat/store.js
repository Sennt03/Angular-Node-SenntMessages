const Model = require('./model')

function add(data){
    const newChat = new Model(data)
    return newChat.save()
}

function getChat(id){
    return Model.findById(id)
}

function findOne(query, options = []){
    return Model.findOne(query, options)
}

function updateChat(id, data){
    return Model.findByIdAndUpdate(id, data, { returnOriginal: false })
}

function getChats(userId){
    return Model.find({users: userId}).populate('users', {password: 0, email: 0})
}

function getChatsSimple(userId){
    return Model.find({users: userId})
}

function getUsersByChatId(chatId){
    return Model.findById(chatId).populate('users', {password: 0, email: 0})
}

module.exports = {
    add,
    getChats,
    getChatsSimple,
    getChat,
    findOne,
    updateChat,
    getUsersByChatId
}