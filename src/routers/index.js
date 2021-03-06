'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const roomController = require('../controller/room.controller')
const messageController = require('../controller/message.controller')
const mychatController = require('../controller/mychat.controller')
const profileController = require('../controller/profile.controller')
const calenderController = require('../controller/calender.controller')
const multiRoomMessageController = require('../controller/multiRoomMessage.controller')
router.get('/test', (req, res) => {
  res.render('test')
})

router.get('/navbar', (req, res) => {
  res.render('navbar')
})

router.get('/profile', (req, res) => {
  res.render('profile')
})
router.post('/profile', profileController.imgUpdate)

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/oneToOneChat', (req, res) => {
  res.render('oneToOneChat')
})
router.get('/multiChat', (req, res) => {
  res.render('multiChat')
})
router.get('/notice', (req, res) => {
  res.render('notice')
})
//로그인
router.get('/login', async (req, res) => {
  console.log('login')
  res.render('login')
  // try {
  //   console.log(req.cookies.uid)
  //   if (req.cookies.uid) {
  //     await userController.connect
  //     res.redirect('notice')
  //   } else {
  //     res.render('login')
  //   }
  // } catch (e) {
  //   res.render('login')
  // }
})

router.post('/login', userController.login)

router.get('/logout', userController.logout)
//회원가입
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

//유저정보 얻어오기

//모든 유저정보 얻어오기
router.get('/user', userController.allUser)
//현재 로그인한 id 얻어오기
router.get('/user/auth', (req, res) => {
  console.log(req.cookies.uid)
  return res.status(200).json({
    data: {
      userId: req.cookies.uid,
      session: req.session.uid,
    },
  })
})
//한명의 유저정보 얻어오기
router.get('/user/:id', userController.onefind)

router.get('/chat/:id', (req, res) => {
  res.render('chat')
})

router.get('/chatroom', (req, res) => {
  res.render('chatroom')
})
//
router.get('/loginstatus', userController.disconnect)
//채팅방 가져오기
router.get('/mychat', mychatController.showChat)
//룸 만들기!
router.post('/room', roomController.createRoom)
//메세지 만들기!
router.get('/message/:room_id', messageController.showMessage)
router.post('/message', messageController.newMessage)
router.post('/multiRoomMessage', multiRoomMessageController.newMessage)
router.get('/multiRoomMessage', multiRoomMessageController.showMessage)

router.get('/fullcalendar', (req, res) => {
  res.render('fullCalendar')
})
router.get('/calender/:id', calenderController.showCalender)
router.post('/calender', calenderController.createCalender)
router.put('/calender', calenderController.updateDateCalender)
module.exports = router
