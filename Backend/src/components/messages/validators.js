const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')

// const from = Joi.string();
const chatId = Joi.string();
const message = Joi.string();

const newMessageSchema = Joi.object({
  chatId: chatId.required(),
  message: message.required(),
});

const newImageSchema = Joi.object({
  chatId: chatId.required(),
})

const newMsgValidator = validatorHandler(newMessageSchema)
const newImageValidator = validatorHandler(newImageSchema)

module.exports = { newMsgValidator, newImageValidator }