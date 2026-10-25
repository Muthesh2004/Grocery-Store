// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log the raw Authorization header for debugging
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decode the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded payload for debugging
    console.log("DECODED TOKEN:", decoded);

    // Attach the user ID to the request
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
