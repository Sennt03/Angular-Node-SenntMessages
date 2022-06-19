if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const config = {
    dev: process.env.NODE_ENV != 'production',
    port: process.env.PORT || 3000,
    whiteList: ['https://sennt03.github.io', 'http://sennt03.github.io'],
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/senntmessages',
    jwtSecret:  process.env.JWT_sECRET || 'secret in key gen',
    // cloudinary
    cloud_name: process.env.CLOUD_NAME,
    cloud_key: process.env.CLOUD_KEY,
    cloud_secret: process.env.CLOUD_SECRET,
    imageDefault: {
        url: 'https://res.cloudinary.com/sennt03/image/upload/v1644190649/qxxzb23ov7corfsptvi5.png',
        public_id: 'qxxzb23ov7corfsptvi5',
        default: true
    }
}

module.exports = config