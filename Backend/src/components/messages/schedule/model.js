const { Schema, model } = require('mongoose')

const ScheduleMessageSchema = new Schema({
    from: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    },
    userTo: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
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
        doc: {
            name: String,
            url: String,
            mimetype: String,
            size: String,
            time: {
                type: String,
                required: false
            }
        },
        location: {
            latitud: Number,
            longitud: Number
        }
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('scheduled', ScheduleMessageSchema)