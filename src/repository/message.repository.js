//database
const mysql = require('mysql') // mysql 모듈 로드

const conn = {
  // mysql 접속 설정
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'chatdb',
}
var connection = mysql.createConnection(conn) // DB 커넥션 생성
connection.connect()

exports.insert = (room_id, sender_id, msg, time) => {
  const query = `insert into message value(null,${room_id},${sender_id},'${msg}',now());`
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
exports.select = (room_id) => {
  const query = ` select u.name, u.img, m.sender_id, m.message_content,  DATE_FORMAT(TIME, "%h:%i %p") AS time , time as times  from users u inner join message m on m.sender_id = u.id where room_id =${room_id} order by time desc limit 50) as a order by times asc;`

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
