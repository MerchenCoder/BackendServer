const express = require("express");
const router = express.Router();

// 로그아웃 처리
router.get("/logout", (req, res) => {
  // 쿠키 삭제 후 리다이렉트
  res.clearCookie(USER_COOKIE_KEY);
  res.redirect("/");
});

module.exports = router;
