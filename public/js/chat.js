'use strict'
import { userList } from '../js/data/user.js'
// socket.io 서버에 접속한다
const socket = io()

const chatList = document.querySelector('.chatting-list')
const chatInput = document.querySelector('.chatting-input')
const sendButton = document.querySelector('.send-button')
const originPath = window.location.href
const otherUserId = originPath.split('chat/')[1]

window.addEventListener('DOMContentLoaded', async () => {
  let nickname
  let currentUserId
  const data = await fetch('http://172.30.1.27:5000/user/auth')
    .then((response) => response.json())
    .then((data) => data)
  currentUserId = data.data.userId
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === currentUserId) {
      nickname = userList[i].name
    }
  }

  sendButton.addEventListener('click', () => {
    const param = {
      id: currentUserId,
      name: nickname,
      msg: chatInput.value,
    }
    socket.emit('chatting', param)
  })

  socket.on('chatting', (data) => {
    const { id, name, msg, time } = data
    const item = new LiModel(id, name, msg, time)
    item.makeLi()
  })

  function LiModel(id, name, msg, time) {
    this.id = id
    this.name = name
    this.msg = msg
    this.time = time

    this.makeLi = () => {
      // let otherUser
      // for (let i = 0; i < userList.length; i++) {
      //   if (userList[i].id === otherUserId) {
      //     otherUser = userList[i]
      //   }
      // }
      let count
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === this.id) {
          count = i
        }
      }
      console.log('currentUserId')
      console.log(this.id)
      const li = document.createElement('li')
      li.classList.add(currentUserId === this.id ? 'sent' : 'received')
      const dom = `
      <span class="profile">
        <span class="user">${
          currentUserId === this.id ? '나' : this.name
        }</span>
          <img class="image" src=${userList[count].img} alt="">
        </span>
        <span class="message">
        ${this.msg}
        </span>
      <span class="time">${this.time}</span></span>`
      li.innerHTML = dom
      chatList.appendChild(li)
    }
  }
})
