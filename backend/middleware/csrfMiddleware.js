module.exports = function(req, res, next) {
  const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    // Allow all origins in development/test environments
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173'
    ].filter(Boolean);
    return allowedOrigins.includes(origin);
  };

  // Only protect state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    if (origin) {
      if (!isAllowedOrigin(origin)) {
        return res.status(403).json({ message: `CSRF protection: Invalid Origin (${origin})` });
      }
    } else if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        if (!isAllowedOrigin(refererOrigin)) {
          return res.status(403).json({ message: `CSRF protection: Invalid Referer (${refererOrigin})` });
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
