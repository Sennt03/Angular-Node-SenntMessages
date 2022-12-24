const Model = require('./model')

function addMessage(data){
    const newMessage = new Model(data)
    return newMessage.save()
}

function getMessageById(messageId){
    return Model.findById(messageId)
}

function getMessages(chatId){
    return Model.find({chatId})
}

function readMessages(chatId, userId){
    return Model.updateMany({$and: [{chatId}, {to: userId}, {read: false}]}, {read: true})
}

function deleteMyMessage(messageId, userId){
    return Model.findOneAndDelete({$and: [{_id: messageId}, {from: userId}]})
}

module.exports = {
    addMessage,
    getMessages,
    readMessages,
    deleteMyMessage,
    getMessageById
}