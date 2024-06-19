const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./lib/pgConnect");

const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const saveRouter = require("./routes/save");
const loadRouter = require("./routes/load");
const s3FileDownRouter = require("./routes/downloadFile");

const app = express();

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

//라우트 등록
app.use("/user", signinRouter);
app.use("/user", signupRouter);
app.use("/save", saveRouter);
app.use("/load", loadRouter);
app.use("/download", s3FileDownRouter);
app.use("/image", express.static(__dirname + "/image"));

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    // 1. 데이터베이스에서 모든 테이블 이름을 가져옵니다.
    const tableNamesQuery =
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'";
    const tableNamesResult = await db.query(tableNamesQuery);
    const tableNames = tableNamesResult.rows.map((row) => row.table_name);
    //console.log(tableNamesResult);
    // 2. 각 테이블을 조회하고 결과를 가져와서 표시합니다.
    let html = "";
    for (const tableName of tableNames) {
      if (tableName === "SequelizeMeta") {
        continue; // SequelizeMeta 테이블이면 반복문 건너뜁니다.
      }
      const query = `SELECT * FROM ${tableName}`;
      const result = await db.query(query);

      // 3. 결과를 웹페이지에 표시합니다.
      html += `<h2>${tableName} 테이블 데이터</h2><table style='width:100%; border:1px solid black; border-collapse: collapse;'><tr>`;
      for (const field of result.fields) {
        html += `<th style='border:1px solid black; padding:5px'>${field.name}</th>`;
      }
      html += "</tr>";
      for (const row of result.rows) {
        html += "<tr>";
        for (const field of result.fields) {
          const fieldValue =
            typeof row[field.name] === "object"
              ? JSON.stringify(row[field.name])
              : row[field.name];
          html += `<td style='border:1px solid black; padding:5px; text-align:center;'>${fieldValue}</td>`;
        }
        html += "</tr>";
      }
      html += "</table>";
    }

    // 4. 웹페이지에 결과를 전송합니다.
    res.send(html);
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).send("서버 에러 발생");
  }
});

app.listen(3000, () => {
  console.log("서버 실행됨");
  console.log("Listening on " + 3000);
});
