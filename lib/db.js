const mysql = require("mysql2");
const keys = require("../config/keys");

const pool = mysql.createPool({
  host: keys.db.host,
  user: keys.db.user,
  password: keys.db.password,
  database: keys.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
