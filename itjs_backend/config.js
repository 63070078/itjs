
const mysql = require("mysql2/promise");
require("dotenv").config(); //ใข้งาน .env

const password = `${process.env.DB_PASSWORD}`;
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
<<<<<<< Updated upstream
  password:password, // ใช้ environment variable หรือใส่ค่าเริ่มต้น
=======
  password: 'pinky1510',
>>>>>>> Stashed changes
  database: 'itjs',
  connectionLimit: 10,
});

module.exports = {
  pool,
};
