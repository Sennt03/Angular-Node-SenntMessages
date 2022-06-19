const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')

const name = Joi.string().min(1);
const username = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8);
const field = Joi.string()
const actual =Joi.string()

const registerSchema = Joi.object({
  name: name.required(),
  username: username.required(),
  email: email.required(),
  password: password.required()
});

const loginSchema = Joi.object({
  email: email.required().email(),
  password: password.required()
});

const fieldSchema = Joi.object({
  field: field.required()
})

const valueSchema = Joi.object({
  value: field.required()
})

const changePasswordSchema = Joi.object({
  actual: actual.required(),
  newPassword: password.required()
})

const registerValidator = validatorHandler(registerSchema)
const loginValidator = validatorHandler(loginSchema)
const fieldValidator = validatorHandler(fieldSchema, 'params')
const valueValidator = validatorHandler(valueSchema)
const changePasswordValidator = validatorHandler(changePasswordSchema)

module.exports = { registerValidator, loginValidator, fieldValidator, valueValidator, changePasswordValidator }