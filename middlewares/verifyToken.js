const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").substring(7);
  console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied (no token passed)" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch (err) {
    return res.status(401).json({ success: false, message: "auth token is not valid" });
  }
};

module.exports = verifyToken;