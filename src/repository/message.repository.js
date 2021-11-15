//database
const {queryBuilder} = require('../config/index')
 
exports.insert = (room_id, sender_id, msg, time) => {
  const query = `insert into message value(null,${room_id},${sender_id},'${msg}',now());`
return queryBuilder( query )
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
  const query = ` select * from (
    select u.name, u.img, m.sender_id, m.message_content,  DATE_FORMAT(TIME, "%h:%i %p") AS time , time as times  from users u inner join message m on m.sender_id = u.id where room_id =${room_id} order by time desc limit 50) as a order by times asc;`
  return queryBuilder( query )
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
