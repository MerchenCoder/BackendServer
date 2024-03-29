const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../lib/pgConnect");

const app = express();
app.use(express.json());

app.route("/signin").post(async (req, res) => {
  const data = req.body;
  try {
    //mysql
    // const [results, fields] = await db
    //   .promise()
    //   .query(
    //     `SELECT * FROM player WHERE player_id = '${data.id}' AND player_password = '${data.password}'`
    //   );

    //---로그인 과정---//
    //PostgreSQL user 검색
    const result = await db.query(
      "SELECT *  FROM user_table WHERE user_id = $1",
      [data.id]
    );

    if (result.rows.length === 0) {
      //계정 없음
      console.log("User not fond");
      res.status(404).json({ cmd: 1101, errorno: 404 }); // 클라이언트에게 409 상태 코드와 오류 코드를 전송합니다.
      return;
    }
    const user = result.rows[0];
    const hashedPassword = result.rows[0].user_password;
    const passwordMatch = await bcrypt.compare(data.password, hashedPassword);

    if (!passwordMatch) {
      //해당 아이디, 비밀번호로 된 계정이 없음
      res.status(401).json({ cmd: 1101, errorno: 401 }); // 클라이언트에게 409 상태 코드와 오류 코드를 전송합니다.
      return;
    } else {
      res.status(200).json({
        cmd: 200,
        user_id: user.user_id,
        user_name: user.user_name,
        errorno: 0,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      cmd: 1101,
      errorno: err.errno,
    });
  }
});

module.exports = app;
