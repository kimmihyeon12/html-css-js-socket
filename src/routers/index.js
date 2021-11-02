'use strict'

const express = require('express')
const router = express.Router()
const userList = require('../repository/user.js')
const userController = require('../controller/user.controller')
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { userid, passwd } = req.body

  for (let i = 0; i < userList.userList.length; i++) {
    if (userList.userList[i].userId === userid) {
      console.log('아이디일치')
      if (userList.userList[i].passwd === passwd) {
        console.log('비밀번호일치')
        req.session.user_id = userList.userList[i].id
        res.redirect('/friend')
        return
      }
    }
  }
  console.log('둘다불일치')
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

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
