const Users = require('../classes/Users')

module.exports = {

    connectClient(client, io){
        const user = createUser(client)
        Users.addUser(user)
        client.emit('connected', `Conectado ${client.id}`)
    },

    disconnectClient(client, io){
        client.on('disconnect', () => {
            Users.deleteUser(client.id)
        })
    }

}

function createUser(client){
    return {
        // client,
        socketId: client.id,
        userId: client.handshake.query.userId
    }
}