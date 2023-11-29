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
  //DB에서 player 테이블의 데이터를 가져오는 쿼리
  const sql = "SELECT * FROM player";
  let html;

  db.getConnection((error, connection) => {
    if (error) {
      console.error("DB 연결 에러:", error);
      return res.status(500).send("DB 연결 에러");
    }
    connection.query(sql, (queryError, results) => {
      connection.release(); // 연결 해제
      if (queryError) {
        console.error("쿼리 에러:", queryError);
        // throw queryError; //에러를 던지지 않고 적절한 응답을 보내도록 수정
        html = "<h2>쿼리 에러</h2>";
        res.send(html);
      }
      if (results.length === 0) {
        const html = "<h2>데이터가 없습니다.</h2>";
        return res.send(html);
      }

      const attributes = Object.keys(results[0]); // 결과의 첫 번째 행의 속성들을 가져옴

      let html =
        "<h2>Player 테이블 데이터</h2><table style='width:100%; borber:1px solid black; border-collapse: collapse;'><tr>";

      //테이블 헤더 생성
      for (const attribute of attributes) {
        html += `<th style='border:1px solid black; padding:5px'>${attribute}</th>`;
      }
      html += "</tr>";
      //테이블 데이터 생성
      for (const row of results) {
        html += "<tr>";
        for (const attribute of attributes) {
          html += `<td style='border:1px solid black; padding:5px; text-align:center;'>${row[attribute]}</td>`;
        }
        html += "</tr>";
      }
      html += "</table>";
      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log("서버 실행됨");
  console.log("Listening on " + port);
});
