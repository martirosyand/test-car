const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = null;

  // Extract token from cookies
  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  // Fallback to Authorization header
  if (!token) {
    const authHeader = req.header('Authorization');
    if (authHeader) {
      token = authHeader.replace('Bearer ', '');
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;

    // Refresh the cookie for sliding session (24h from last activity)
    if (req.cookies && req.cookies.adminToken) {
      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
