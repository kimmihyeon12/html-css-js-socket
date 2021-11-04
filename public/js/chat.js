'use strict'

// socket.io 서버에 접속한다
const socket = io()

const chatList = document.querySelector('.chatting-list')
const chatInput = document.querySelector('.chatting-input')
const sendButton = document.querySelector('.send-button')
const originPath = window.location.href
const otherUserId = originPath.split('chat/')[1]
console.log('chat')
window.addEventListener('DOMContentLoaded', async () => {
  console.log('chat dom load')
  let nickname

  const myUserId = await fetch('/user/auth')
    .then((response) => response.json())
    .then((data) => data)

  // const otherUserData = await fetch(`/user/${otherUserId}`)
  //   .then((response) => response.json())
  //   .then((data) => data)
  console.log(myUserId.data.userId)
  const myUserData = await fetch(`/user/${myUserId.data.userId}`)
    .then((response) => response.json())
    .then((data) => data)

  console.log(myUserData.data[0].id)
  console.log(myUserData.data[0].name)
  console.log(myUserData.data[0].img)

  sendButton.addEventListener('click', () => {
    const param = {
      id: myUserData.data[0].id,
      name: myUserData.data[0].name,
      img: myUserData.data[0].img,
      msg: chatInput.value,
    }
    socket.emit('chatting', param)
  })

  socket.on('chatting', (data) => {
    const { id, name, img, msg, time } = data
    const item = new LiModel(id, name, img, msg, time)
    item.makeLi()
  })

  function LiModel(id, name, img, msg, time) {
    this.id = id
    this.name = name
    this.msg = msg
    this.time = time
    this.img = img

    this.makeLi = () => {
      const li = document.createElement('li')
      li.classList.add(myUserId.data.userId === this.id ? 'sent' : 'received')
      const dom = `
      <span class="profile">
        <span class="user">${
          myUserId.data.userId === this.id ? '나' : this.name
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
