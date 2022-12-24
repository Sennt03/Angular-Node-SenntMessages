const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')
const myError = require('../../libs/myError')

// const from = Joi.string();
const update = Joi.string();
const email = Joi.string();
const email2 = Joi.string().email();

const latitud = Joi.number()
const longitud = Joi.number()

const updateSchema = Joi.object({
  update: update.required(),
});

const emailSchema = Joi.object({
    email: email.required()
})

const updateLocationSchema = Joi.object({
    latitud: latitud.required(),
    longitud: longitud.required()
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
const updateLocationValidator = validatorHandler(updateLocationSchema)

module.exports = { updateValidator, validatorField, validateEmail, validatorEmail, updateLocationValidator }