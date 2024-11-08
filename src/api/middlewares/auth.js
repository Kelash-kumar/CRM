const jwt = require('jsonwebtoken');
const environment = require('../../config/environment');
const ApiError = require('../../utils/ApiError');
const User = require('../../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = jwt.verify(token, environment.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Authentication failed'));
  }
};

module.exports = auth;