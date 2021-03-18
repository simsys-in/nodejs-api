const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password : process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

//   pool.getConnection((err, conn) => {
//       if(err){
//           console.error(err)
//       }
//       else{
          console.log( process.env.DB_NAME + " DB Conneccted!")
//       }
//   })

module.exports = pool;