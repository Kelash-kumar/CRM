import winston from 'winston';
import environment from '../utils/environment.js';

const logger = winston.createLogger({
  level: environment.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (environment.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;