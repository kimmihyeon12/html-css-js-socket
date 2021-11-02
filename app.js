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
const bodyParser = require('body-parser')
require('dotenv').config()
//database

io.on('connection', (socket) => {
  socket.on('chatting', (data) => {
    console.log(2)
    const { id, name, msg } = data
    io.emit('chatting', {
      id,
      name,
      msg,
      time: moment(new Date()).format('h:mm A'),
    })
  })
})

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
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
