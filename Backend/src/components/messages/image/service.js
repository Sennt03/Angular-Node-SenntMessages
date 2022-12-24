const path = require('path')
const myError = require('../../../libs/myError')
const fs = require('fs-extra')
const cloudinary = require('cloudinary')
const config = require('../../../config/config')
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_key,
    api_secret: config.cloud_secret
})

async function uploadImage(file){
    if(!isImage(file.mimetype)){
        throw myError('Only images', 400)
    }
    const filePath = path.join(__dirname, '../../../uploads/imgs/' + Date.now() + file.name)
    file.mv(filePath)
    const response = await cloudinary.v2.uploader.upload(filePath)
    const url = response.secure_url
    const public_id = response.public_id
    fs.unlink(filePath)
    return {
        url,
        public_id
    }
}

function uploadDoc(file){
    const name = Date.now() + file.name
    const filePath = path.join(__dirname, '../../../uploads/docs/' + name)
    file.mv(filePath)
    const url = `/uploads/docs/${name}`
    return {
        url,
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
        time: file?.time
    }
}

function isImage(mimeType){
    let match = mimeType.split('/')[0]
    if(match === 'image') return true
        else return false
}

function isAudio(mimeType){
    let match = mimeType.split('/')[0]
    if(match === 'audio') return true
        else return false
}

function deleteImage(public_id){
    return cloudinary.v2.uploader.destroy(public_id)
}

function deleteDoc(url){
    const filePath = path.join(__dirname, '../../..' + url)
    fs.unlink(filePath)
}

module.exports = { uploadImage, deleteImage, isImage, isAudio, uploadDoc, deleteDoc }