const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'agilfi38_isacbatista',
  password: 'Makaveli96#',
  database: 'agilfi38_placas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify for Node.js async/await
const promisePool = pool.promise();

module.exports = promisePool; 