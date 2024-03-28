const express = require("express");
const db = require("../lib/pgConnect");
const app = express();

app.use(express.json());

app.route("/api/signin").post(async (req, res) => {
  const data = req.body;
  console.log(data.id, data.password);

  try {
    //mysql
    // const [results, fields] = await db
    //   .promise()
    //   .query(
    //     `SELECT * FROM player WHERE player_id = '${data.id}' AND player_password = '${data.password}'`
    //   );

    //PostgreSQL
    const { rows } = await db.query(
      "SELECT user_id, user_name  FROM user_table WHERE user_id = $1 AND user_password = $2",
      [data.id, data.password]
    );

    console.log(rows);

    if (rows.length === 0) {
      //해당 아이디, 비밀번호로 된 계정이 없음
      res.status(404).json({ cmd: 1101, errorno: 404 }); // 클라이언트에게 409 상태 코드와 오류 코드를 전송합니다.
    } else {
      const user = rows[0];
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
