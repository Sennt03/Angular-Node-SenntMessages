const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')
const myError = require('../../libs/myError')

// const from = Joi.string();
const update = Joi.string();
const email = Joi.string();
const email2 = Joi.string().email();

const updateSchema = Joi.object({
  update: update.required(),
});

const emailSchema = Joi.object({
    email: email.required()
})

const validatorField = (req, res, next) => {
    let { field } = req.params;
    if(field == 'name' || field == 'username' || field == 'email'){
        next();
    }else{
        next(myError('Nonexistent field', 400));
    }
}

const validateEmail = (value) => {
    const { error } = email2.validate(value, { abortEarly: false, allowUnknown: true });
    if (error) {
        return false
    }else{
        return true
    }
}


const updateValidator = validatorHandler(updateSchema)
const validatorEmail = validatorHandler(emailSchema)

module.exports = { updateValidator, validatorField, validateEmail, validatorEmail }