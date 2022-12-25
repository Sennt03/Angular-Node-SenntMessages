const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const router = require('./network/routes')
const errHandler = require('./middlewares/errorHandlers')
const socket = require('./socket/socket')
const config = require('./config/config')
const db = require('./db/connection')
const path = require('path')
const { reloadSchedules } = require('./components/messages/schedule/service')
const { ExpressPeerServer } = require('peer')

const optionsCors = { origin: (origin, callback) => {
    if (config.whiteList.includes(origin) || !origin) callback(null, true);
        else callback(new Error('no permitido'));
    }
}

class App{

    constructor(){
        this.app = express()
        this.server = require('http').Server(this.app)
        this.middlewares()
        this.initializations()
        this.routes()
        this.errHandlers()
    }

    middlewares(){
        this.app.use(cors());
        // this.app.use(cors(optionsCors));
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(fileupload())
    }

    initializations(){
        db()
        socket.connect(this.server)
    }

    routes(){
        router(this.app)
        
        this.app.use(express.static(path.join(__dirname, '../public')))
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'))
        })

        this.app.use(express.static(path.join(__dirname, '/uploads/docs')))

    }

    errHandlers(){
        this.app.use(errHandler.logErrors)
        this.app.use(errHandler.errorHandler)
    }

    start(){
        this.serverPeer = this.server.listen(config.port, () => {
            if(config.dev) config.whiteList.push('http://localhost:4200')
            console.log('Server on port', config.port)
            reloadSchedules()
        })

        this.startServerPeer()
    }

    startServerPeer(){
        const peerServer = ExpressPeerServer(this.serverPeer, {
            path: '/connect'
        })
        
        this.app.use('/peerjs', peerServer)
    }

}

module.exports = App