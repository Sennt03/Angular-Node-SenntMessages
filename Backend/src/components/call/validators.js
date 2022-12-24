const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')
const myError = require('../../libs/myError')

// const from = Joi.string();
const to = Joi.string();
const type = Joi.string();
const peerId = Joi.string();

const createPeerSchema = Joi.object({
  to: to.required(),
  type: type.required()
});

const getPeerSchema = Joi.object({
  peerId: peerId.required(),
});

const createPeerValidator = validatorHandler(createPeerSchema)
const getPeerValidator = validatorHandler(getPeerSchema)

module.exports = { createPeerValidator, getPeerValidator }