// const peer = {
//     id: string,
//     users: ['userId', 'userToId'],
//     connected: ['userId', 'userId']
// }

class Peer{
    peers = []

    static _instance

    static get instance(){
        return this._instance || (this._instance = new Peer())
    }

    getList(){
        return this.peers
    }

    addPeer(peer){
        this.peers.push(peer)
    }

    updatePeer(peer, peerId){
        const index = this.peers.findIndex(peer => peer.id == peerId)
        if(index > -1){
            this.peers[index] = peer
        }
    }

    deletePeer(id){
        this.peers = this.peers.filter(peer => peer.id != id)
    }

    findById(id){
        return this.peers.find(peer => peer.id == id)
    }

}

const instance = Peer.instance

module.exports = instance