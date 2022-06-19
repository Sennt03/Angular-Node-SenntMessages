const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')
const { registerValidator, loginValidator, fieldValidator, valueValidator, changePasswordValidator } = require('./validators') 
const { checkUserEmail, checkUsername, verifyToken } = require('../../middlewares/authHandlers') 

router.post('/register', registerValidator, checkUserEmail, checkUsername, async (req, res, next) => {
    try{
        const rta = await controller.register(req.body)
        response(req, res, rta, 201)
    }catch(error){
        next(error)
    }
})

router.post('/login', loginValidator, async (req, res, next) => {
    try{
        const rta = await controller.login(req.body)
        response(req, res, rta, 200)
    }catch(error){
        next(error)
    }
})

router.post('/validate/:field', fieldValidator, valueValidator, async (req, res, next) => {
    const { field } = req.params
    const { value } = req.body
    try{
        const isAvaible = await controller.validateField(field, value)
        response(req, res, isAvaible)
    }catch(error){
        next(error)
    }
})

router.post('/changePassword', verifyToken, changePasswordValidator, async (req, res, next) => {
    try{
        await controller.changePassword(req.user._id, req.body)
        response(req, res, {message: 'Password updated successfully'})
    }catch(err){
        next(err)
    }
})

module.exports = router