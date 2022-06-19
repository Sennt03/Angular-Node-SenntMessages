const Model = require('./model')

function addMessage(data){
    const newMessage = new Model(data)
    return newMessage.save()
}

function getMessages(chatId){
    return Model.find({chatId})
}

function readMessages(chatId, userId){
    return Model.updateMany({$and: [{chatId}, {to: userId}, {read: false}]}, {read: true})
}

module.exports = {
    addMessage,
    getMessages,
    readMessages
}