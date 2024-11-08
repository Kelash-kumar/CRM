const environment = require('../../config/environment');
const logger = require('../../config/logger');
const ApiError = require('../../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  const statusCode = 500;
  const message = environment.NODE_ENV === 'development' 
    ? err.message 
    : 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message
  });
};

module.exports = errorHandler;