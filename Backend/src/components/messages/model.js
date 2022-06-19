const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
    chatId: {
        type: Schema.ObjectId,
        ref: 'chats',
        required: true
    },
    from: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    },
    to: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
        required: false
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('messages', MessageSchema)