const myError = require('../../../libs/myError')
const store = require('./store')
const chatController = require('../../chat/controller')
const messageStore = require('../store')
const Events = require('../../../socket/classes/Events')
const events = require('../../../socket/events/events')

const schedulesClass = require('../../../libs/manageSchedules')

async function addSchedule(data, milisegundos){
    const schedule = await store.addSchedule(data)
    createSchedule(data, milisegundos, schedule._id)
    return schedule
}

function createSchedule(data, milisegundos, scheduleId){
    if(milisegundos < 0) milisegundos = 0
     else if(milisegundos > 999999999) throw myError('No more than 1 week and a half is allowed', 400)
    const newSchedule = { id: scheduleId }
    newSchedule.timeOut = setTimeout(() => {
        sendSchedule(data, scheduleId)
    }, milisegundos);
    schedulesClass.addSchedule(newSchedule)
}

async function sendSchedule({from, userTo, message}, scheduleId){
    try{
        const chat = await chatController.getChatByUsers([from, userTo], true)

        if(!chat?.blocked?.from){
            const sendMessage = {
                chatId: chat._id,
                from,
                to: userTo,
                message: message.message,
                read: false
            }
        
            if(message?.image && message?.image.url){
                sendMessage.image = message.image
            }else if(message?.doc && message?.doc?.url){
                sendMessage.doc = message.doc
            }

            if(message?.location){
                sendMessage.location = message.location
            }
        
            const newMessage = await messageStore.addMessage(sendMessage)
            Events.emitTo(events.NEW_MESSAGE, newMessage.to, newMessage)
            Events.emitMe(events.NEW_MESSAGE, 'dontHave', newMessage.from, newMessage)

            // Delete SCHEDULE IN BBDD
            const scheduleDeleted = await store.deleteScheduleToSend(scheduleId)
            schedulesClass.deleteSchedule(scheduleId)
            Events.emitMe(events.SCHEDULE_DELETEMESSAGE, 'dontHave', newMessage.from, {...scheduleDeleted._doc, send: true})
        }
    }catch(err){
        console.log(err)
    }

}

function getSchedules(userId){
    return store.getSchedules(userId)
}

async function deleteSchedule(scheduleId, userId){
    const schedule = await store.deleteSchedule(scheduleId, userId)
    if(!schedule){
        throw myError('The schedule does not exist', 400)
    }
    schedulesClass.clearAndDeleteSchedule(scheduleId)
    return schedule
}

async function reloadSchedules(){
    try{
        const schedules = await store.getAllSchedules()
        schedules.forEach(schedule => {
            const data = schedule
            const scheduleId = schedule._id
            const fechaInicio = new Date().getTime();
            const fechaFin = new Date(schedule.date).getTime();
            let milisegundos = fechaFin - fechaInicio;
            if(milisegundos < 0) milisegundos = 0
            createSchedule(data, milisegundos, scheduleId)
        });
    }catch(err){
        console.log('Failed to start scheduled messages')
    }

}

module.exports = {
    addSchedule,
    getSchedules,
    deleteSchedule,
    reloadSchedules
}