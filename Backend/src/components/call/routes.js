const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const { createPeerValidator, getPeerValidator } = require('./validators')
const Events = require('../../socket/classes/Events')
const events = require('../../socket/events/events')
const userController = require('../user/controller')

router.post('/createCall', verifyToken, createPeerValidator, (req, res, next) => {
    const { _id: userId } = req.user
    const { to, type } = req.body
    try{
        const peer = controller.createPeer(userId, to, type)
        response(req, res, peer)
    }catch(error){
        next(error)
    }
})

router.get('/getPeer/:peerId', verifyToken, (req, res, next) => {
    const { _id: userId } = req.user
    const { peerId } = req.params
    try{
        const peer = controller.getPeer(userId, peerId)
        response(req, res, peer)
    }catch(error){
        next(error)
    }
})

router.post('/sendCall', verifyToken, getPeerValidator, async (req, res, next) => {
    const { _id: userId } = req.user
    const { peerId } = req.body
    try{
        const peer = controller.getPeer(userId, peerId)
        const to = peer.users[1]
        const peerUpdated = controller.updatedConnectedPeer(peer, peerId)
        const from = await userController.getUser(userId)
        peerUpdated.from = from
        Events.emitTo(events.CALL_INCOMING, to, peerUpdated)
        response(req, res, peer)
    }catch(error){
        next(error)
    }
})

router.delete('/deleteCall/:peerId', verifyToken, (req, res, next) => {
    const { _id: userId } = req.user
    const { peerId } = req.params
    try{
        const peer = controller.deletePeer(userId, peerId)
        const to = peer.users.find(user => user != userId.toString())
        Events.emitTo(events.CALL_ENDED, to, peer)
        response(req, res, peer)
    }catch(error){
        next(error)
    }
})

module.exports = router