'use strict'

// socket.io 서버에 접속한다
const socket = io()
console.log(socket)

window.addEventListener('popstate', function (e) {
  history.go(e.currentTarget.length)
})

const chatList = document.querySelector('.chatting-list')
const chatInput = document.querySelector('.chatting-input')
const sendButton = document.querySelector('.send-button')
const displayContainer = document.querySelector('.display-container')

const originPath = window.location.href
const otherUserId = originPath.split('chat/')[1]

window.addEventListener('DOMContentLoaded', async () => {
  let nickname
  //현재 로그인한(세션에 있는 유저) 유저 id 얻어오기
  const myUserId = await fetch('/user/auth')
    .then((response) => response.json())
    .then((data) => data)

  //현재 로그인한 유저정보(이미지, 닉네임) 얻어오기
  const myUserData = await fetch(`/user/${myUserId.data.userId}`)
    .then((response) => response.json())
    .then((data) => data)
  //방번호 얻어오기
  const roomNumber = await fetch(`/room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id1: otherUserId,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.room_id)

  console.log(`roomNumber ${roomNumber}`)
  //대화 내용 얻어오기
  const backupMessage = await fetch(`/message/${roomNumber}`)
    .then((response) => response.json())
    .then((data) => data)
  console.log(backupMessage)

  backupMessage.forEach((message) => {
    console.log(message)
    const item = new LiModel(
      message.sender_id,
      message.name,
      message.img,
      message.message_content,
      message.time,
    )
    item.makeLi()
  })
  displayContainer.scrollTop = displayContainer.scrollHeight

  socket.emit('joinRoom', roomNumber)

  sendButton.addEventListener('click', async () => {
    const param = {
      id: myUserData.data[0].id,
      name: myUserData.data[0].name,
      img: myUserData.data[0].img,
      msg: chatInput.value,
    }
    socket.emit('chatting', roomNumber, param)
    await fetch(`/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: roomNumber,
        sender_id: myUserData.data[0].id,
        msg: chatInput.value,
      }),
    })
    chatInput.value = null
  })

  socket.on('chatting', async (data) => {
    console.log('chatting')
    const { id, name, img, msg, time } = data
    const item = new LiModel(id, name, img, msg, time)
    item.makeLi()
    displayContainer.scrollTop = displayContainer.scrollHeight
  })

  function LiModel(id, name, img, msg, time) {
    this.id = id
    this.name = name
    this.msg = msg
    this.time = time
    this.img = img

    this.makeLi = () => {
      const li = document.createElement('li')
      li.classList.add(
        Number(myUserId.data.userId) === this.id ? 'sent' : 'received',
      )
      const dom = `
      <span class="profile">
        <span class="user">${
          Number(myUserId.data.userId) === this.id ? '나' : this.name
        }</span>
          <img class="image" src=${img} alt="">
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
