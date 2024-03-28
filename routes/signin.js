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
      res.json({
        cmd: 1101,
        errorno: 9001,
      });
    } else {
      const user = rows[0];
      res.json({
        cmd: 200,
        user_id: user.user_id,
        user_name: user.user_name,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      cmd: 1101,
      errorno: err.errno,
    });
  }
});

module.exports = app;
