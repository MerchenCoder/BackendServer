if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod"); //개발 환경인 경우
} else {
  module.exports = require("./dev"); //프로덕션 환경인 경우
}
