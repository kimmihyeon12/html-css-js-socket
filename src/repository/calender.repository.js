const { queryBuilder } = require('../config/index')
exports.select = (id) => {
  const query = `select * from calender where user_id = ${id};`
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
exports.insert = (id, title, startTime, endTime) => {
  const query = ` insert into calender value(null, ${id},'${title}' ,'테스트중이에요11','${startTime}','${endTime}');`
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
