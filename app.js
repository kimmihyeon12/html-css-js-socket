'use strict'
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
//express가 http를 통해 실행될수있도록
const socketIO = require('socket.io')
const io = socketIO(server)
const moment = require('moment')
const pageRouter = require('./src/routers')
var session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const { query } = require('express')
app.use(cors())
let users = []
let roomNumber
io.on('connection', (socket) => {
  console.log('-----------------')
  console.log('connection')
  console.log(socket.id)
  socket.on('joinRoom', (num) => {
    roomNumber = num
    console.log('joinroom')
    console.log(`roomNumber ${roomNumber}`)
    socket.join(roomNumber)
  })
  socket.on('chatting', function (num, data) {
    console.log('chatting')
    const { id, name, img, msg } = data
    io.to(num).emit('chatting', {
      id,
      name,
      img,
      msg,
      time: moment(new Date()).format('h:mm A'),
    })
  })
  socket.on('connectuser', (user) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == user) {
        console.log(`userid ${users[i].id}`)
        users.remove(i)
      }
    }
    users.push({
      id: user,
      socket_id: socket.id,
    })
    console.log(users)
    users.push(user)
    io.emit(users)
  })
  socket.on('disconnect', () => {
    console.log(socket.id)
    console.log('소켓종료')
  })
})
app.use(cookieParser())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 유효기간 1시간
    },
  }),
)

app.set('views', path.resolve(__dirname, './public/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.json())
//? Use form-urlencoded : req 객체에서 x-www-form-urlencoded 타입의 body 받기
app.use(
  express.urlencoded({
    extended: true,
  }),
)

const PORT = process.env.PORT || 5000
app.use(pageRouter)
server.listen(PORT, () => console.log(`server is running ${PORT}`))
