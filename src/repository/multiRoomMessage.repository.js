//database
const { queryBuilder } = require('../config/index')

exports.insert = (sender_id, msg) => {
  const query = `insert into multi_room_meesage value(null,${sender_id},'${msg}',now());`
  return queryBuilder(query)
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
  const query = `select u.id,u.img,u.name,u.email, m.sender_user_id, m.message_content, m.times, m.time from users u inner join (
    select * from (
    select id, sender_user_id, message_content, DATE_FORMAT(TIME, "%h:%i %p") AS times, time from multi_room_meesage order by time desc LIMIT 100 ) m ) m on u.id = m.sender_user_id order by time asc;`
  console.log(query)
  return queryBuilder(query)
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
