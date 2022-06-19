const { Schema, model } = require('mongoose')

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        },
        default: {
            type: String
        }
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('users', mySchema)