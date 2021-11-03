'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
router.get('/', (req, res) => {
  res.render('index')
})

//로그인
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', userController.login)

//회원가입
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

//유저정보 얻어오기
router.get('/user', userController.allfind)

router.get('/friend', (req, res) => {
  res.render('friendList')
})

router.get('/user/auth', (req, res) => {
  console.log(`user/auth 요청옴!! ${req.session.user_id}`)
  return res.status(200).json({
    data: {
      userId: req.session.user_id,
    },
  })
})

router.get('/chat/:id', (req, res) => {
  res.render('chat')
})

module.exports = router
