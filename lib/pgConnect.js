var pg = require("pg");

const client = new pg.Pool({
  user: "master",
  host: "127.0.0.1",
  database: "merchencoderdb",
  password: "teamtang1886",
  port: 5432,
});

module.exports = client; // 다른 파일에서도 이 client 객체를 사용할 수 있도록 내보냄
