module.exports = function(req, res, next) {
  // Only protect state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.origin;
    const referer = req.headers.referer;
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173'
    ].filter(Boolean);

    if (origin) {
      if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({ message: 'CSRF protection: Invalid Origin' });
      }
    } else if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        if (!allowedOrigins.includes(refererOrigin)) {
          return res.status(403).json({ message: 'CSRF protection: Invalid Referer' });
        }
      } catch (err) {
        return res.status(403).json({ message: 'CSRF protection: Invalid Referer header format' });
      }
    } else {
      return res.status(403).json({ message: 'CSRF protection: Origin or Referer header required' });
    }
  }
  next();
};
