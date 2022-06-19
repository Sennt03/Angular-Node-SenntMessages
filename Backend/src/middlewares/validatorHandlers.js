const myError = require('../libs/myError')

function cleanData(data){
  for(const key in data){
    if(typeof data[key] === 'string'){
      data[key] = data[key].trim()
    }
  }
  return data
}

function validatorHandler(schema, field = 'body') {
  return (req, res, next) => {
    let data = req[field];
    data = cleanData(data)
    const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });
    if (error) {
      next(myError(error, 400, error.details));
    }
    next();
  }
}

module.exports = validatorHandler;