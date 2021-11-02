// const mysql = require('mysql2')

// console.log('database loading..')

// const conn = {
//   // mysql 접속 설정
//   host: process.env.DB_MYSQL_HOST,
//   port: process.env.DB_MYSQL_POST,
//   user: process.env.DB_MYSQL_USER,
//   password: process.env.DB_MYSQL_PW,
//   database: process.env.DB_MYSQL_DB_NAME,
// }
// const db = mysql.createConnection(conn) // DB 커넥션 생성
// console.log(`process.env.DB_MYSQL_HOST ${process.env.DB_MYSQL_HOST}`)
// console.log(`process.env.DB_MYSQL_USER ${process.env.DB_MYSQL_USER}`)
// db.connect(function (err) {
//   if (err) {
//     console.log(err.code) // 'ECONNREFUSED'
//     console.log(err.fatal) // true
//   } else {
//     console.log('커넥션 완료!')
//   }
// })

// exports.query = function (query, params) {
//   return new Promise((resolve, reject) => {
//     db.query(query, params, function (err, result) {
//       if (err) reject(err)
//       else resolve(result)
//     })
//   })
// }
