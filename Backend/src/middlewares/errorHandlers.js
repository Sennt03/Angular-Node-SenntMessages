const config = require('../config/config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { mymessage: error, stack };
  }

  return { mymessage: error };
}

function logErrors(err, req, res, next) {
  // console.log(err)
  next(err);
}

function errorHandler(err, req, res, next) {
  const messageError = err.own ? err.message : 'Internal server error'
  const statusCode = err.own ? err.status : 500
  res.status(statusCode)
     .json(withErrorStack(messageError, err.stack));
}

module.exports = {
  logErrors,
  errorHandler
};
