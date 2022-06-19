const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')

const to = Joi.string();

const newChatSchema = Joi.object({
  to: to.required(),
});

const newChatValidator = validatorHandler(newChatSchema)

module.exports = { newChatValidator }