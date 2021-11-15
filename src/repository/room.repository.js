//database

const {queryBuilder} = require('../config/index')

exports.insert = (id1, id2) => {
  const query = `insert into room value(null,${id1},${id2});`
 
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
exports.select = (id1, id2) => {
  const query = `select * from room where member_o=${id1} and member_t=${id2};`
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
