const db = require('mongoose')
const config = require('../config/config')

db.Promise = global.Promise

async function connect(url = config.dbUri){
    await db.connect(url, {
        useNewUrlParser: true
    })
    console.log('DB connected successfull')
}

module.exports = connect