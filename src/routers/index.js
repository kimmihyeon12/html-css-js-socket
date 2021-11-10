'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const roomController = require('../controller/room.controller')
const messageController = require('../controller/message.controller')
const mychatController = require('../controller/mychat.controller')
router.get('/', (req, res) => {
  res.render('index')
})

//로그인
router.get('/login', (req, res) => {
  if (!(req.session.user_id === undefined)) {
    res.redirect('friend')
  }
  res.render('login')
})

router.post('/login', userController.login)

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log('세션 삭제시 에러')
      return
    }
    res.redirect('login')
  })
})
//회원가입
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

router.get('/friend', (req, res) => {
  res.render('friendList')
})

//유저정보 얻어오기
//모든 유저정보 얻어오기
router.get('/user', userController.currentConnecting)
//현재 로그인한 id 얻어오기
router.get('/user/auth', (req, res) => {
  return res.status(200).json({
    data: {
      userId: req.session.user_id,
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
//채팅방 가져오기
router.get('/mychat', mychatController.showChat)
//룸 만들기!
router.post('/room', roomController.createRoom)
//메세지 만들기!
router.get('/message/:room_id', messageController.showMessage)
router.post('/message', messageController.newMessage)
module.exports = router
