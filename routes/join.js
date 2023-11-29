const express = require("express");
const db = require("../lib/db");
const app = express();

app.use(express.json());

app.route("/api/join").post((req, res) => {
  const user = req.body;
  console.log(user.id, user.password, user.nickname, user.age);

  db((connection) => {
    const sql = `insert into player values ('${user.id}', '${user.password}',"salt" ,'${user.nickname}', '${user.age}', 0)`;
    console.log(sql);
    con.query(sql, (err, result, fields) => {
      if (err) {
        console.log(err.errno);
        res.json({
          cmd: 1001,
          errorno: err.errno,
        });
      } else {
        console.log(result);
      }
      con.end();
    });
  });
});

module.exports = app;
