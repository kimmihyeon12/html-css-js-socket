//database

const { queryBuilder } = require('../config/index')

exports.update = (userId, imgId) => {
  const query = `  
  update users
  set img = '${imgId}'
  where id = ${userId}
  ;`
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
