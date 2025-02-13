// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token given" });
  }

  // Split 'Bearer <token>' and get the token part
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware; // Ensure correct export
