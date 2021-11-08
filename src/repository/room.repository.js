//database
const mysql = require('mysql') // mysql 모듈 로드

const conn = {
  // mysql 접속 설정
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'admin',
  database: 'chatdb',
}
var connection = mysql.createConnection(conn) // DB 커넥션 생성
connection.connect()

exports.insert = (id1, id2) => {
  const query = `insert into room value(null,${id1},${id2});`
  console.log(query)
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: true,
        data: data,
      }
    })
    .catch((err) => {
      return {
        success: false,
        data: 'error',
      }
    })
  connection.end()
}
exports.select = (id1, id2) => {
  const query = `select * from room where member_o=${id1} and member_t=${id2};`
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: true,
        data: data,
      }
    })
    .catch((err) => {
      return {
        success: false,
        data: 'error',
      }
    })
  connection.end()
}
