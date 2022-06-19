const store = require('./store')
const chatStore = require('../chat/store')
const myError = require('../../libs/myError')
const config = require('../../config/config')
const { deleteImage, uploadImage } = require('../messages/image/service')

function getUser(id){
    return store.findOneById(id, {password: 0})
}

function getUsers(query = {}){
    return store.findAll(query, {password: 0})
}

function getUsersChat(userId){
    return Promise.all([
        store.findAll({_id: {$nin: userId}}, {password: 0}),
        chatStore.getChatsSimple(userId)
    ]).then(values => {
        values[0].forEach(user => {
            values[1].forEach(chat => {
                if(chat.users.includes(user._id)){
                    user._doc.chatId = chat._id
                    return
                }
            });
        });
        return values[0]
    })
}

async function validTo(id){
    const user = await store.findOneById(id, {password: 0})
    if(!user){
        throw myError('Invalid To', 400)
    }else{
        return user._id
    }
}

async function updateProfile(userId, field, update){
    let updateObj = {}
    updateObj[field] = update
    const user = await store.findOne(updateObj)
    if(user){
        throw myError(`The ${field} is already in use`, 400)
    }
    
    return store.updateOne(userId, updateObj)
}

async function removeImage(userId){
    const user = await store.findOneById(userId)
    if(!user.image.default || user.image.default != 'true'){
        await deleteImage(user.image.public_id)
        return store.updateOne(userId, {image: config.imageDefault})
    }
    return user
}

async function updateImage(userId, file){
    if(!file){
        throw myError('File is required', 400)
    }
    const user = await store.findOneById(userId)
    const promises = []
    if(user.image.default != 'true'){
        promises[0] = deleteImage(user.image.public_id)
    }

    promises[1] = uploadImage(file)
    // No manejo el error ya que si ocurre algun error ya lo maneja la ruta enviando a un middleware
    return Promise.all(promises).then(res => {
        const image = res[1]
        return store.updateOne(userId, {image})
    })

}

module.exports = {
    getUser,
    getUsers,
    validTo,
    getUsersChat,
    updateProfile,
    removeImage,
    updateImage
}