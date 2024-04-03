require("dotenv").config(); // dotenv 라이브러리를 사용하여 .env 파일을 읽어 환경 변수로 설정합니다.
var pg = require("pg");

const client = new pg.Pool({
  user: process.env.POSTGRE_SQL_USER,
  host: "merchencoder-db.cbzgh5lpkhzj.ap-northeast-2.rds.amazonaws.com",
  database: "merchencoder",
  password: process.env.POSTGRE_SQL_PASSWORD,
  port: 5432,
});

module.exports = client; // 다른 파일에서도 이 client 객체를 사용할 수 있도록 내보냄
