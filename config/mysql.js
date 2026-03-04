const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || process.env.MYSQL_USER || 'mazuri',
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_PASSWORD || 'mazuri_pass',
  database: process.env.MYSQL_DATABASE || process.env.MYSQL_DATABASE || 'mazuri',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
