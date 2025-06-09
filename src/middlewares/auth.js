const jwt = require("jsonwebtoken");
const SECRET = "secretkey";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  // const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

module.exports = { authMiddleware };
