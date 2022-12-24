const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')

// const from = Joi.string();
const chatId = Joi.string();
const chatsId = Joi.array();
const message = Joi.string();
// Translate
const language = Joi.string();
const messages = Joi.array();
// Schedule
const userTo = Joi.string();
const milisegundos = Joi.number();
const date = Joi.date();

const newMessageSchema = Joi.object({
  chatId: chatId.required(),
  message: message.required(),
});

const newMessageMultipleSchema = Joi.object({
  usersId: chatsId.required()
});

const newImageSchema = Joi.object({
  chatId: chatId.required(),
})

const newTranslateSchema = Joi.object({
  language: language.required(),
  messages: messages.required()
})

const scheduleMessageSchema = Joi.object({
  userTo: userTo.required(),
  milisegundos: milisegundos.required(),
  date: date.required()
})

const newMsgValidator = validatorHandler(newMessageSchema)
const newMsgMultipleValidator = validatorHandler(newMessageMultipleSchema)
const newImageValidator = validatorHandler(newImageSchema)
const newTranslateValidator = validatorHandler(newTranslateSchema)
const scheduleMessageValidator = validatorHandler(scheduleMessageSchema)

module.exports = { newMsgValidator, newMsgMultipleValidator, newImageValidator, newTranslateValidator, scheduleMessageValidator }