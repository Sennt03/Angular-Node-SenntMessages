const Peer = require('./Peer')
const { v4: uuidv4 } = require('uuid')
const myError = require('../../libs/myError') 

function createPeer(userId, to, type){
    const id = uuidv4();
    const newPeer = {
        id,
        type,
        users: [userId.toString(), to],
        connected: []
    }
    Peer.addPeer(newPeer)
    return newPeer
}

function getPeer(userId, peerId){
    const peer = Peer.findById(peerId)
    
    if(!peer){
        throw myError('Peer does not exists', 400)
    }

    if(!peer.users.includes(userId.toString())){
        throw myError('Unahutorized', 403)
    }

    return peer
}

function updatedConnectedPeer(peer, peerId){
    const newPeer = {...peer, connected: [peer.users[0]]}
    Peer.updatePeer(newPeer, peerId)
    return newPeer
}

function deletePeer(userId, peerId){
    const peer = getPeer(userId, peerId)
    Peer.deletePeer(peer.id)
    return peer
}


module.exports = {
    createPeer,
    getPeer,
    updatedConnectedPeer,
    deletePeer
}