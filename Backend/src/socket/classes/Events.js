const { socket } = require('../socket')
const Users = require('./Users')

class Events{

    emitTo(event, to, payload){
        const usersSocket = Users.findById(to)
        if(usersSocket && usersSocket.length > 0){
            usersSocket.forEach(userSocket => {
                socket.io.to(userSocket.socketId).emit(event, payload)
            });
        }
    }

}

const events = new Events()

module.exports = events