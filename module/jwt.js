const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

// 토큰 발급
function generateToken(userid) {
  const token = jwt.sign(
    {
      // 사용자 아이디 Payload에 저장
      userid,
      // Milliseconds(1000분의 1초 단위)
      // 24시간 뒤에 토큰 만료
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24시간
    },
    JWT_SECRET
  );

  return token;
}

function verifyToken(token) {
  // 임의의 문자열로 구성된 토큰을 Payload로 되돌림
  const decoded = jwt.verify(token, JWT_SECRET);

  // exp가 현재 시간 이전인 경우(만료된 토큰)
  if (decoded.exp < Date.now()) {
    return null;
  }
  // 토큰이 유효한 경우 사용자 ID 반환
  // 이 ID로 users.json에서 사용자 찾아서 정보 렌더링 가능
  return decoded.username;
}

module.exports = {
  generateToken,
  verifyToken,
};
