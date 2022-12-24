const router = require('express').Router()

const auth = require('../components/auth/routes')
const user = require('../components/user/routes')
const message = require('../components/messages/routes')
const chat = require('../components/chat/routes')
const call = require('../components/call/routes')

function routerApp(app){
    app.use('/api', router)
    router.use('/auth', auth)
    router.use('/user', user)
    router.use('/message', message)
    router.use('/chat', chat)
    router.use('/call', call)
}

module.exports = routerApp