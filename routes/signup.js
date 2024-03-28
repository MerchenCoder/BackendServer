var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db = require("../lib/pgConnect");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use("/image", express.static(__dirname + "/image"));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/public/login.html");
// });

app.route("/api/signup").post((req, res) => {
  const user_table = [
    req.body.user_id,
    req.body.user_name,
    req.body.user_password,
    req.body.user_salt,
  ];
  const sql =
    "insert into user_table(user_id,user_name,user_password,user_salt) values($1,$2,$3,$4)";
  db.query(sql, user_table, (err, result) => {
    if (err) {
      console.log(err.errno);
      res.status(500).json({ error: "An error occurred while signing up." });
    } else {
      console.log(result);
      res.status(200).json({ message: "User signed up successfully." });
    }
  });
});
// app.post("/register", (req, res, next) => {
//   const user_table = [
//     req.body.user_id,
//     req.body.user_name,
//     req.body.user_password,
//     req.body.user_salt,
//   ];

//const sql ="insert into user_table(user_id,user_name,user_password,user_salt) values($1,$2,$3,$4)";

// db.query(sql, user_table, (err, row) => {
//   if (err) console.log(err);
// });

//   return res.status(200).json({ result: "ok" });
// });

module.exports = app;
