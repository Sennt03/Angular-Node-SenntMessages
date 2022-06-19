function myError(message, status, validations = false){
    let messageCode = message
    if(validations) messageCode = messageValidations(validations)

    const error = new Error(messageCode)
    error.status = status || 500
    error.own = true


    return error
}

function messageValidations(validations){
    let text = ''
    if(validations.length > 1){
        validations.forEach((validation, index) => {
            text += validation.message
            if((index + 1) < validations.length){
                text += ' - '
            }
        });
    }else{
        text = validations[0].message
    }
    return text
}

module.exports = myError