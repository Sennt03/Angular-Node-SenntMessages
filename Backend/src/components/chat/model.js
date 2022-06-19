const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'users'
    }]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('chats', ChatSchema)