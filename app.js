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

const database = require('./src/config/index')
const { disconnect } = require('process')
database.connector()
app.use(cors())
let users = []
let multiConnectingUsers = []
let roomNumber
io.on('connection', (socket) => {
  console.log('-----------------')
  console.log('소켓 연결')
  // console.log(socket.id)
  socket.on('joinRoom', (num) => {
    roomNumber = num
    console.log('joinroom')
    console.log(`roomNumber ${roomNumber}`)
    socket.join(roomNumber)
  })
  socket.on('chatting', function (num, data) {
    console.log(`chatting ${data.msg}`)
    const { id, name, img, msg } = data
    io.to(num).emit('chatting', {
      id,
      name,
      img,
      msg,
      time: moment(new Date()).format('h:mm A'),
    })
  })
  socket.on('multichatting', function (data) {
    console.log(`chatting ${data.msg}`)
    const { id, name, img, msg } = data
    io.emit('multichatting', {
      id,
      name,
      img,
      msg,
      time: moment(new Date()).format('h:mm A'),
    })
  })
  socket.on('connectuser', (user) => {
    console.log(user)
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == user) {
        users.splice(i, 1)
      }
    }
    users.push({
      id: user,
      socket_id: socket.id,
    })
    console.log(users)
    io.emit('connectuser', users)
  })
  socket.on('disconnect', () => {
    console.log(socket.id)
    console.log('disconnect---------------------------')
    let disconnectUser
    for (let i = 0; i < users.length; i++) {
      if (users[i].socket_id == socket.id) {
        console.log(users[i])
        disconnectUser = users[i]
        users.splice(i, 1)
      }
    }
    for (let i = 0; i < multiConnectingUsers.length; i++) {
      if (multiConnectingUsers[i].socket_id == socket.id) {
        console.log(multiConnectingUsers[i])
        disconnectUser = multiConnectingUsers[i]
        multiConnectingUsers.splice(i, 1)
      }
    }
    io.emit('disconnectuser', disconnectUser)
    io.emit('multidisconnectuser', disconnectUser)
    console.log('소켓종료')
  })
  socket.on('multiconnectuser', (user) => {
    console.log('user')
    console.log(user)
    for (let i = 0; i < multiConnectingUsers.length; i++) {
      if (multiConnectingUsers[i].id == user.id) {
        multiConnectingUsers.splice(i, 1)
      }
    }
    multiConnectingUsers.push({
      id: user.id,
      img: user.img,
      name: user.name,
      email: user.email,
      socket_id: socket.id,
    })
    console.log(multiConnectingUsers)
    io.emit('multiconnectuser', multiConnectingUsers)
  })
  socket.on('multidisconnectuser', () => {
    console.log('multidisconnectuser')
    let disconnectUser
    for (let i = 0; i < multiConnectingUsers.length; i++) {
      if (multiConnectingUsers[i].socket_id == socket.id) {
        console.log(multiConnectingUsers[i])
        disconnectUser = multiConnectingUsers[i]
        multiConnectingUsers.splice(i, 1)
      }
    }
    io.emit('multidisconnectuser', disconnectUser)
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
