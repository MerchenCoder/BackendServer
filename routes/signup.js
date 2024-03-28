const express = require("express");
const db = require("../lib/pgConnect");
const bcrypt = require("bcrypt"); //암호화 모듈
const app = express();

app.use(express.json());

app.route("/api/signup").post(async (req, res) => {
  const hasedPassword = await bcrypt.hash(req.body.password, 10); //암호화, saltround = 10
  const user_table = [req.body.id, req.body.name, hasedPassword];

  const sql =
    "insert into user_table(user_id,user_name,user_password) values($1,$2,$3)";

  db.query(sql, user_table, (err, result) => {
    if (err) {
      console.error(err);

      console.log(err.errno);
      if (err.code === "23505") {
        // 만약 에러 코드가 고유키 또는 중복 제약 조건 위반이면
        res.status(409).json({ cmd: 1201, errorno: 409 }); // 클라이언트에게 409 상태 코드와 오류 코드를 전송합니다.
      } else {
        // 그 외의 에러라면
        res.status(500).json({ cmd: 1201, errorno: 500 }); // 클라이언트에게 500 상태 코드와 오류 메시지를 전송합니다.
      }
    } else {
      console.log("User signed up successfully."); // 성공 메시지를 콘솔에 기록합니다.
      res.status(200).json({ cmd: 200, errorno: 0 }); // 클라이언트에게 200 상태 코드와 성공 코드를 전송합니다.
    }
  });
});

module.exports = app;
