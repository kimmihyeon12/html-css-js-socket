
const mysql = require('mysql') // mysql 모듈 로드
const conn = {
  // mysql 접속 설정
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'chatdb',
}
const connection = mysql.createConnection(conn)
exports.connector = () => {
    connection.connect(err => { 
        if (err) {
            console.log(`Failed to connect db => ${err}`);
        } else {
            console.log("데이터베이스 커넥션 완료");
        } 
    });
}
 

exports.queryBuilder = ( query, values ) => {
    return new Promise((resolve, reject) => {
        connection.query( query, values, ( err, result ) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}

 