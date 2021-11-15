
const {queryBuilder} = require('../config/index')

exports.select = (user_id) => {
  const query = `select * from users u inner join (select * from (
    select r.room_id, r.member_o, r.member_t, m.sender_id, m.message_content, DATE_FORMAT(TIME, "%h:%i %p") AS time from (select * from room where member_o=${user_id}) r inner join message m on r.room_id = m.room_id order by m.time desc LIMIT 18446744073709551615) a group by a.room_id
    )  c on u.id = c.member_t  order by time desc;`
  console.log(query)
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
