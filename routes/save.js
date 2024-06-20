const express = require("express");
const db = require("../lib/pgConnect");

const app = express();
app.use(express.json());

app.route("/:userId").post(async (req, res) => {
  const { userId } = req.params;
  const { tableName, jsonData } = req.body;

  const attribute = tableName.replace("_table", "");

  try {
    // 해당 테이블에 사용자가 이미 있는지 확인
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      // 사용자가 없으면 INSERT
      await db.query(
        `INSERT INTO ${tableName} (user_id, ${attribute}) VALUES ($1, $2)`,
        [userId, jsonData]
      );
    } else {
      // 사용자가 이미 있으면 UPDATE
      await db.query(
        `UPDATE ${tableName} SET ${attribute} = $1 WHERE user_id = $2`,
        [jsonData, userId]
      );
    }

    res.status(200).json({ cmd: 200, errorno: 0 });
  } catch (error) {
    console.error("쿼리 오류", error);
    console.log(error.errorno);
    res.status(500).json({ cmd: 3001, errorno: error.errorno });
  }
});

module.exports = app;
