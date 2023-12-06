const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'itjs',
  connectionLimit: 10,
});

module.exports = {
  pool,
};
