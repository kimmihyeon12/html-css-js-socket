const { queryBuilder } = require('../config/index')

exports.select = (user_id) => {
  const query = `
  select * from users u inner join (
    select * from (
      select r.room_id, r.member_o, m.sender_id, m.message_content, DATE_FORMAT(TIME, "%h:%i %p") AS time from (
      select room_id, member_o  from (
        SELECT room_id, member_o FROM room where (member_o=${user_id} or member_t=${user_id})
        UNION ALL
        SELECT room_id, member_t FROM room where (member_o=${user_id} or member_t=${user_id}) 
              )
      c where member_o not like ${user_id}) 
    r inner join message m on r.room_id = m.room_id order by m.time desc LIMIT 18446744073709551615) a group by a.room_id   
    )  c on u.id = c.member_o  order by time desc ;
  `

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
