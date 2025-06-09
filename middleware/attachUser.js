// middlewares/attachUser.js
const jwt = require('jsonwebtoken');

function attachUser(req, res, next) {
  const token = req.cookies.token; // pastikan kamu pakai cookie-parser

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Token invalid — biarkan req.user tetap undefined
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
}

module.exports = attachUser;
