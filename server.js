const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = require("./lib/pgConnect");

const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const logoutRouter = require("./routes/logout"); // logout 파일의 경로에 맞게 수정해주세요

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(signinRouter);
app.use(signupRouter);
app.use(logoutRouter);

app.use("/image", express.static(__dirname + "/image"));

app.get("/", async (req, res) => {
  try {
    // 1. 데이터베이스에서 모든 테이블 이름을 가져옵니다.
    const tableNamesQuery =
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'";
    const tableNamesResult = await db.query(tableNamesQuery);
    const tableNames = tableNamesResult.rows.map((row) => row.table_name);
    console.log(tableNamesResult);
    // 2. 각 테이블을 조회하고 결과를 가져와서 표시합니다.
    let html = "";
    for (const tableName of tableNames) {
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
          html += `<td style='border:1px solid black; padding:5px; text-align:center;'>${
            row[field.name]
          }</td>`;
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

//   //DB에서 player 테이블의 데이터를 가져오는 쿼리
//   const sql = "SELECT * FROM user_table";
//   let html;
//   db.query(sql, (queryError, results) => {
//     if (queryError) {
//       console.error("쿼리 에러:", queryError);
//       // throw queryError; //에러를 던지지 않고 적절한 응답을 보내도록 수정
//       html = "<h2>쿼리 에러</h2>";
//       return res.send(html);
//     }

//     if (results.length === 0) {
//       html = "<h2>데이터가 없습니다.</h2>";
//       return res.send(html);
//     }

//     const fields = results.fields; // 결과의 첫 번째 행의 속성들을 가져옴

//     html =
//       "<h2>user_table 테이블 데이터</h2><table style='width:100%; borber:1px solid black; border-collapse: collapse;'><tr>";
//     const attributes = [];
//     //테이블 헤더 생성
//     for (const field of fields) {
//       attributes.push(field.name);
//       html += `<th style='border:1px solid black; padding:5px'>${field.name}</th>`;
//     }
//     html += "</tr>";
//     //테이블 데이터 생성
//     for (const row of results.rows) {
//       html += "<tr>";
//       for (const attribute of attributes) {
//         html += `<td style='border:1px solid black; padding:5px; text-align:center;'>${row[attribute]}</td>`;
//       }
//       html += "</tr>";
//     }
//     html += "</table>";
//     res.send(html);
//   });
//});

app.listen(3000, () => {
  console.log("서버 실행됨");
  console.log("Listening on " + 3000);
});
