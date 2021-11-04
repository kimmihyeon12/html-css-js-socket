'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
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
router.get('/user', userController.allfind)
//현재 로그인한 id 얻어오기
router.get('/user/auth', (req, res) => {
  console.log(`user/auth 요청옴!! ${req.session.user_id}`)
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

module.exports = router
