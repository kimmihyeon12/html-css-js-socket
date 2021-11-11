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

exports.selectOne = (id) => {
  const query = `select id,img,name,email from users where id = ${id};`
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: false,
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
exports.selectAll = () => {
  const query = `select id,img,name,email from users`
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: false,
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
exports.selectLoginUser = () => {
  const query = `select id,img,name,email from users where loginstatus = true;`
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: false,
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

exports.updateLoginStatus = (id, loginstatus) => {
  const query = ` update users 
                  set loginstatus = ${loginstatus}
                  where id = ${id}`
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: false,
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

exports.updateLoginAccessTime = (id) => {
  const query = ` update users 
                  set access_time = now()
                  where id = ${id}`
  console.log(query)
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: false,
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

exports.selectEmail = (email) => {
  const query = `select * from users where email='${email}';`
  const checkEmail = CheckEmail(email)
  if (!checkEmail)
    return {
      success: false,
      message: '이메일 형식을 확인해주세요',
    }
  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      if (data.length != 0)
        return {
          success: false,
          message: '존재하는 이메일 입니다',
        }
      return {
        success: true,
        message: '사용하실 수 있는 이메일 입니다',
      }
    })
    .catch((err) => {
      console.log('error')
      return {
        success: false,
        message: 'error',
      }
    })
  connection.end()
}

exports.selectPw = (email) => {
  const query = `select passwd from users where email='${email}';`
  console.log(query)

  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        data: data,
      }
    })
    .catch((err) => {
      console.log('error')
      return {
        success: false,
        message: 'error',
      }
    })
  connection.end()
}

exports.selectId = (email) => {
  const query = `select id from users where email='${email}';`

  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        data: data,
      }
    })
    .catch((err) => {
      console.log('error')
      return {
        success: false,
        message: 'error',
      }
    })
  connection.end()
}

exports.insert = (name, email, passwd) => {
  const query = `insert into users values(null,null,'${name}','${email}','${passwd}');`

  return new Promise(function (resolve, reject) {
    connection.query(query, null, function (err, results, fields) {
      if (err) reject(err)
      resolve(results)
    })
  })
    .then((data) => {
      return {
        success: true,
        message: 'success',
        data: data,
      }
    })
    .catch((err) => {
      return {
        success: false,
        message: 'error',
      }
    })
  connection.end()
}

function CheckEmail(e) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  if (!reg_email.test(e)) {
    return false
  } else {
    return true
  }
}
