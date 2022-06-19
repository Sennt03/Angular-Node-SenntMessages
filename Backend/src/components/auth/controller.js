const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const myError = require('../../libs/myError')
const config = require('../../config/config')
const store = require('../user/store')

async function register(user){
    const password = await bcrypt.hash(user.password, 10)
    user.password = password
    user.image = config.imageDefault
    const newUser = await store.addUser(user)
    const sendUser = createSendUser(newUser)

    const token = jwt.sign(sendUser, config.jwtSecret, { expiresIn: '2h' })
    
    return { user: sendUser, token }
}

async function login({ email, password }){
    const user = await store.findUserEmail(email)
    
    if(!user){
        throw myError("Email doesn't exist", 400)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw myError('Password Incorrect', 400)
    }

    const sendUser = createSendUser(user)
    const token = jwt.sign(sendUser, config.jwtSecret, { expiresIn: '2h' })    
    
    return { user: sendUser, token }
}

function createSendUser(user){
    const sendUser = user._doc
    delete sendUser.password
    return sendUser
}

async function validateField(field, value){
    let exists
    if(field === 'email'){
        const re = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
        if(!re.exec(value)) return { isAvailable: true }
        exists = await store.findValidate(value)
    }else if(field === 'username'){
        exists = await store.findValidate(value, false)
    }else{
        throw myError('Field invalid', 400)
    }

    let isAvailable = exists ? false : true

    return {
        isAvailable
    }
}

async function changePassword(userId, passwords){
    const { actual, newPassword } = passwords
    const user = await store.findOneById(userId)
    if(!user) throw myError("User doesn't exist", 400)
    const { password } = user
    
    const isMatch = await bcrypt.compare(actual, password)
    if(!isMatch){
        throw myError('The current password is incorrect', 400)
    }

    const updateObj = { 
        password: await bcrypt.hash(newPassword, 10) 
    }
    return store.updateOne(userId, updateObj)
}

module.exports = {
    register,
    login,
    validateField,
    changePassword
}