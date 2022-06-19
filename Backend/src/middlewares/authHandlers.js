const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../components/user/model')
const myError = require('../libs/myError')

module.exports = {
    async verifyToken(req, res, next){
        try{
            let token = req.header('authorization')
        
            if(!token) return next(myError('Unauthorized', 401))
            token = token.split('Bearer ')[1]

            const decoded = jwt.verify(token, config.jwtSecret)
            const user = await User.findById(decoded._id, {password: 0})
            
            if(!user) return next(myError('Unauthorized', 401))
            req.user = user
            next()
        }catch(e){
            next(myError('Unauthorized', 401))
        }
    },

    async checkUserEmail(req, res, next){
        const user = await User.findOne({email: req.body.email})

        if(user) return next(myError('Email already exists', 400))
        
        next()
    },

    async checkUsername(req, res, next){
        const user = await User.findOne({username: req.body.username})
        
        if(user) return next(myError('Username already exists', 400))
        
        next()
    }
    
}