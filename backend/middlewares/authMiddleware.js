const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // console.warn('❌ No Authorization header');
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    // console.warn('❌ No token after Bearer');
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      // console.warn('❌ No user found for token');
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    // console.error('❌ Token validation error:', err.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
