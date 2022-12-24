const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')
const { verifyToken } = require('../../middlewares/authHandlers')
const Users = require('../../socket/classes/Users')
const Events = require('../../socket/classes/Events')
const { updateValidator, validatorField, validateEmail, validatorEmail, updateLocationValidator } = require('./validators')

router.get('/', verifyToken, async (req, res, next) => {
    const { _id } = req.user
    try{
        const user = await controller.getUser(_id)
        response(req, res, user)
    }catch(error){
        next(error)
    }
})

router.get('/getAll', verifyToken, async (req, res, next) => {
    try{
        const users = await controller.getUsersChat(req.user._id)
        response(req, res, users)
    }catch(error){
        next(error)
    }
})

router.post('/update/:field', verifyToken, validatorField, updateValidator, async (req, res, next) => {
    try{
        const { field } = req.params
        const { update } = req.body
        const userUpdated = await controller.updateProfile(req.user._id, field, update)
        delete userUpdated._doc.password
        response(req, res, userUpdated)
    }catch(err){
        next(err)
    }
})

router.post('/updateImage', verifyToken, async (req, res, next) => {
    const { remove } = req.body
    const userId = req.user._id
    let user
    try{
        if(remove){
            user = await controller.removeImage(userId)
        }else{
            let file = false
            if(req.files){
                file = req.files['file']
            }
            user = await controller.updateImage(userId, file)
        }
        response(req, res, user)
    }catch(err){
        next(err)
    }
})

router.post('/validateEmail', validatorEmail, (req, res, next) => {
    const { email } = req.body
    response(req, res, { isValid: validateEmail(email) })
})

router.get('/allConnect', (req, res, next) => {
    const listUsers = Users.getList()
    response(req, res, { listUsers })
})


// LOCATION

router.post('/updateLocation', verifyToken, updateLocationValidator, async (req, res, next) => {
    const { latitud, longitud } = req.body
    const update = { latitud, longitud, share: true }
    try{
        const userUpdated = await controller.updateProfile(req.user._id, 'location', update)
        response(req, res, userUpdated)
    }catch(err){
        next(err)
    }
})

router.delete('/deleteLocation', verifyToken, async (req, res, next) => {
    try{
        const userUpdated = await controller.updateProfile(req.user._id, 'location', {})
        response(req, res, userUpdated)
    }catch(err){
        next(err)
    }
})


module.exports = router