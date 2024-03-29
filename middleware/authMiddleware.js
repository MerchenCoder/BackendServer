const { verifyToken } = require("../module/jwt");
const USER_COOKIE_KEY = "user_token";
const cookieParser = require("cookie-parser"); // 쿠키 파서 모듈 추가

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies[USER_COOKIE_KEY];
  if (token) {
    const username = verifyToken(token);
    if (userid !== null) {
      req.username = userid;
    }
  }
  next();
};

module.exports = authMiddleware;
