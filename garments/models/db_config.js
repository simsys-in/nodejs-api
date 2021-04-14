const util = require('util');
const mysql = require('mysql')

console.log(process.env.DB_NAME);

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password : process.env.DB_PASS,
});


console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS)


module.exports = connection;