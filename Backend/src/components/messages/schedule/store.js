const Model = require('./model')

function addSchedule(data){
    const newSchedule = new Model(data)
    return newSchedule.save()
}

function deleteScheduleToSend(scheduleId){
    return Model.findByIdAndDelete(scheduleId)
}

function getAllSchedules(){
    return Model.find()
}

function getSchedules(userId){
    return Model.find({from: userId}).populate('userTo', {password: 0, email: 0})
}

function deleteSchedule(scheduleId, userId){
    return Model.findOneAndDelete({$and: [{_id: scheduleId}, {from: userId}]})
}

module.exports = {
    addSchedule,
    deleteSchedule,
    deleteScheduleToSend,
    getSchedules,
    getAllSchedules
}