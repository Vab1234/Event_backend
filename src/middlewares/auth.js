const jwt = require("jsonwebtoken");
const SECRET = "secretkey";

function authMiddleware(req, res, next) {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Chal lawde");
  }
};

module.exports = {authMiddleware};