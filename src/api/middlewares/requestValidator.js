const ApiError = require('../../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }
  next();
};

module.exports = validate;