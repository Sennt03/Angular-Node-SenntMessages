const Model = require('./model')

function addUser(user){
    const newUser = new Model(user)
    return newUser.save()
}

function findUserEmail(email){
    return Model.findOne({email})
}

function findUserbyUsername(username){
    return Model.findOne({username})
}

function findValidate(field, email = true){
    if(email){
        return Model.findOne({email: {$regex: `^${field}$`, $options: 'i'}})
    }else{
        return Model.findOne({username: {$regex: `^${field}$`, $options: 'i'}})
    }
}

function findOneById(id, options = {}){
    return Model.findById(id, options)
}

function findOne(query, options = {}){
    return Model.findOne(query, options)
}

function findAll(query = {}, options = {}){
    return Model.find(query, options)
}

function updateOne(userId, update){
    return Model.findByIdAndUpdate(userId, update, { returnOriginal: false })
}

module.exports = {
    addUser,
    findUserEmail,
    findUserbyUsername,
    findOne,
    findOneById,
    findValidate,
    findAll,
    updateOne
}