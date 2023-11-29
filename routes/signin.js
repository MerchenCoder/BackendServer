const express = require("express");
const db = require("../lib/db");
const app = express();

app.use(express.json());

app.route("/api/signin").post(async (req, res) => {
  const data = req.body;
  console.log(data.id, data.password);

  try {
    const [results, fields] = await db
      .promise()
      .query(
        `SELECT * FROM player WHERE player_id = '${data.id}' AND player_password = '${data.password}'`
      );

    console.log(results);

    if (results[0] === undefined) {
      res.json({
        cmd: 1101,
        errorno: 9001,
      });
    } else {
      res.json({
        cmd: 200,
        player_id: results[0].player_id,
        player_password: results[0].password,
        nickname: results[0].nickname,
        age: results[0].age,
        money: results[0].money,
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
