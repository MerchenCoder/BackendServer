const express = require("express");
const keys = require("./config/keys");
const db = require("./lib/db");

const signinRouter = require("./routes/signin");
const joinRouter = require("./routes/join");

const app = express();
const port = keys.port;

app.use(express.json());
app.use(signinRouter);
app.use(joinRouter);

app.get("/", (req, res) => {
  db.getConnection((error, connection) => {
    if (error) {
      console.error("DB 연결 에러:", error);
      throw error;
    }
  });
  res.send("<h2>This is root endpoint<h2>");
});

app.listen(port, () => {
  console.log("서버 실행됨");
  console.log("Listening on " + port);
});
