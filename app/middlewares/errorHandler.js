import environment from '../utils/environment.js';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.utils.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Server error:", err); // Detailed logging
  res.status(statusCode).json({
    statusCode,
    message,
  });
};


export default errorHandler;