'use strict'

const express = require('express')
const router = express.Router()
const userList = require('../repository/user')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { userid, passwd } = req.body
  console.log(userList.length)
  for (let i = 0; i < userList.length; i++) {
    console.log(userList[i].id)
    if (userList[i].userId === userid) {
      console.log('아이디일치')
      if (userList[i].passwd === passwd) {
        console.log('비밀번호일치')
        res.redirect('/friend')
        return
      }
    }
  }
  //alert('아이디 또는 비밀번호가 틀렸습니다')
})

router.get('/friend', (req, res) => {
  res.render('friendList')
})

router.get('/user/auth', (req, res) => {
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
