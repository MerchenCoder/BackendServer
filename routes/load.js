const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../lib/pgConnect");

const router = express.Router(); // express 라우터 생성

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const userDataQuery = `SELECT play_data, player_data, item_list, game_status_data
    FROM play_data_table AS pd
    JOIN player_data_table AS plyr ON pd.user_id = plyr.user_id
    JOIN item_list_table AS itm ON pd.user_id = itm.user_id
    JOIN game_status_data_table AS gs ON pd.user_id = gs.user_id
    WHERE pd.user_id = $1`;
    // const playDataQuery = `SELECT play_data FROM play_data_table WHERE user_id = $1`;
    // const playerDataQuery = `SELECT player_data FROM player_data_table WHERE user_id = $1`;
    // const itemListQuery = `SELECT item_list FROM item_list_table WHERE user_id = $1`;
    // const gameStatusDataQuery = `SELECT game_status_data FROM game_status_data_table WHERE user_id = $1`;

    // const playDataResult = await db.query(playDataQuery, [userId]);

    // const playerDataResult = await db.query(playerDataQuery, [userId]);
    // const itemListResult = await db.query(itemListQuery, [userId]);
    // const gameStatusDataResult = await db.query(gameStatusDataQuery, [userId]);
    const userDataResult = await db.query(userDataQuery, [userId]);
    console.log(userDataResult);
    // 모든 결과가 빈 배열인 경우에는 데이터가 없음을 클라이언트에게 알립니다.
    if (
      //   playDataResult.rows.length === 0 &&
      //   playerDataResult.rows.length === 0 &&
      //   itemListResult.rows.length === 0 &&
      //   gameStatusDataResult.rows.length === 0
      userDataResult.rows.length === 0
    ) {
      return res.status(404).json({ cmd: 2001, errorno: 404 });
    }
    const userData = {
      //   playData: JSON.stringify(playDataResult.rows[0].play_data),
      //   playerData: JSON.stringify(playerDataResult.rows[0].player_data),
      //   itemList: JSON.stringify(itemListResult.rows[0].item_list),
      // gameStatusData: JSON.stringify(
      //   gameStatusDataResult.rows[0].game_status_data
      //   ),
      playData: JSON.stringify(userDataResult.rows[0].play_data),
      playerData: JSON.stringify(userDataResult.rows[0].player_data),
      itemList: JSON.stringify(userDataResult.rows[0].item_list),
      gameStatusData: JSON.stringify(userDataResult.rows[0].game_status_data),
    };

    res.status(200).json({ cmd: 200, errorno: 0, data: userData });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ cmd: 2001, errorno: error.errorno });
  }
});

module.exports = router;
