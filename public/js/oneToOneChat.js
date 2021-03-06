const socket = io()
const friendList = document.querySelector('.user-list')
const userChatList = document.querySelector('.user-chat-list')
const chatList = document.querySelector('.chat-list')
const displayContainer = document.querySelector('.display-container')
let chatInput
let sendButton
const chatEl = document.querySelector('.chat')
const chatTitle = document.querySelector('.chat-title')
let otherId

let connectingUser
let connectUsers = []
let colorChart = [
  '#F2E4DC',
  '#F2E8B3',
  '#B5D991',
  '#8C625E',
  '#D9BD6A',
  '#8C786C',
  'yellow-100',
  '#B3E7F2',
  '#BFB4B0',
  '#F2BBC5',
  '#736F3F',
  '#F2EFEB',
]
window.addEventListener('DOMContentLoaded', async () => {
  socket.on('connectuser', async (users) => {
    console.log('connect')
    users.forEach((user) => {
      document.querySelector(`.user-id${user.id}`).style.backgroundColor =
        '#74DF00'
    })
  })
  socket.on('disconnectuser', async (user) => {
    console.log('disconnect')

    document.querySelector(`.user-id${user.id}`).style.backgroundColor =
      '#c7c7c7'
  })

  socket.on('chatting', async (data) => {
    console.log(`chatting ${data.id}`)
    console.log(`other ${otherId}`)
    const { id, name, img, msg, time } = data
    const item = new LiModel(id, name, img, msg, time)
    item.makeLi()
    displayContainer.scrollTop = displayContainer.scrollHeight
    let chatContent = document.querySelector(`.chat-content${otherId}`)
    console.log(chatContent)
    chatContent.innerHTML = msg
    chatInput.value = ''
  })

  //모든 user정보 가져오기
  const userList = await fetch('/user')
    .then((response) => response.json())
    .then((data) => data.data)
  console.log(userList)

  for (let i = 0; i < userList.length; i++) {
    const li = document.createElement('li')

    li.className = `li${i} flex items-center mb-2 cursor-pointer `
    li.innerHTML = `
    <div class="relative mr-1">
      <img src=${
        userList[i].img === null
          ? `asset/user1.png`
          : `asset/user${userList[i].img}.png`
      } class="  w-[30px] h-[30px] border-2 shadow-md rounded-3xl bg-[${
      colorChart[userList[i].img]
    }] bg-opacity-40 ">
        <div
        class=" flex absolute top-[18px] left-[18px] items-center justify-center w-[12px] h-[12px] bg-white rounded-3xl">
          <div class="user-id${
            userList[i].id
          } w-[8px] h-[8px]  bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
      <p class="user-name${i} text-sm font-neom text-gray-700">${
      userList[i].name
    }</p>
    </div>`
    friendList.appendChild(li)
    document.querySelector(`.li${i}`).addEventListener('click', () => {
      getChat(userList[i].id, userList[i].name)
    })
  }

  // 로그인한 user 'me'로 표시
  const userData = await fetch(`/user/auth`)
    .then((response) => response.json())
    .then((data) => data)

  socket.emit('connectuser', userData.data.userId)

  const userId = Number(userData.data.userId)
  for (let i = 0; i < userList.length; i++) {
    if (userId === userList[i].id) {
      connectingUser = userList[i]
      document.querySelector(`.li${i}`).remove()
      const li = document.createElement('li')
      li.className = `li${i} flex items-center mb-2 bg-purple-100 rounded-lg`
      li.innerHTML = `
      <div class="relative mr-1">
      <img src="${
        userList[i].img === null
          ? 'asset/user1.png'
          : `asset/user${userList[i].img}.png`
      } "
      } class="w-[30px] h-[30px]  rounded-3xl border-2 border-purple-200 bg-[${
        colorChart[userList[i].img]
      }] bg-opacity-40">
        <div
        class=" flex absolute top-[18px] left-[18px] items-center justify-center w-[12px] h-[12px] bg-white rounded-3xl">
            <div class="user-id${
              userList[i].id
            } w-[8px] h-[8px] bg-gray rounded-3xl"></div>
        </div>
        </div>
      <p class="text-sm text-purple-800 font-neom">${userList[i].name}</p>
      <p class="pl-2 pr-2 ml-1 text-xs bg-gray-100 rounded-lg font-neob">me</p>
      `

      friendList.prepend(li)
    }
  }
  //현재 접속한 `나`와 채팅중인 사람 가져오기
  const chatUser = await fetch(`/mychat`)
    .then((response) => response.json())
    .then((data) => data)
  console.log(chatUser)
  for (let i = 0; i < chatUser.length; i++) {
    const li = document.createElement('li')
    li.className = `user-chat${i} li${i} flex pt-1 pb-1   rounded-md cursor-pointer`
    li.innerHTML = `
    <div class="flex items-center pl-1  ">
      <img  src="${
        chatUser[i].img === null
          ? 'asset/user1.png'
          : `asset/user${chatUser[i].img}.png`
      }" class="w-12 h-12  rounded-3xl bg-[${
      colorChart[chatUser[i].img]
    }] bg-opacity-80">
    </div>
      <div class="ml-3">
        <div class="flex items-center">
          <p class=" user-name${i} w-[185px] text-[15px] font-neosb">${
      chatUser[i].name
    }</p>
          <p class="text-[12px] font-neom  text-gray-500">${
            chatUser[i].time
          }</p>
        </div>
      <p class="chat-content${
        chatUser[i].id
      } text-[15px] font-neom text-gray-500">${chatUser[i].message_content}</p>
      </div>
    </div>`

    userChatList.appendChild(li)
    // 클릭시 채팅방 접속!
    document
      .querySelector(`.user-chat${i}`)
      .addEventListener('click', async (e) => {
        for (let j = 0; j < chatUser.length; j++) {
          if (j == i) {
            document.querySelector(
              `.user-chat${j}`,
            ).style.backgroundColor = `#ede9fe`
          } else {
            document.querySelector(`.user-chat${j}`).style.backgroundColor = ``
          }
        }
        getChat(chatUser[i].id, chatUser[i].name)
      })
  }
  //채팅방 접속시
  async function getChat(id, name) {
    chatTitle.innerHTML = `${name}님과 채팅방`
    while (chatEl.hasChildNodes()) {
      // 부모노드가 자식이 있는지 여부를 알아낸다
      chatEl.removeChild(chatEl.firstChild)
    }
    chatList.innerHTML = ``
    const div = document.createElement('div')
    const dom = `
    <div class="flex">
      <input type="text" value="" class="chatting-input w-[830px] h-[80px] rounded-md border ">
      <button type="text" class="send-button w-[100px] h-[80px] rounded-md text-center bg-purple-300 ml-2 text-white  font-neob"> 전송 </button>
    </div>
      `
    div.innerHTML = dom
    chatEl.appendChild(div)
    chatInput = document.querySelector('.chatting-input')
    sendButton = document.querySelector('.send-button')

    const otherUserId = id
    //채팅방 접속시 룸 번호 알아내기
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
    //채팅방접속시 룸에 있는 메세지 가져오기
    const backupMessage = await fetch(`/message/${roomNumber}`)
      .then((response) => response.json())
      .then((data) => data)
    backupMessage.forEach((message) => {
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
    chatInput.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
        console.log('enter')
        submit()
      }
    })
    sendButton.addEventListener('click', () => {
      submit()
    })
    async function submit() {
      const param = {
        id: connectingUser.id,
        name: connectingUser.name,
        img: connectingUser.img,
        msg: chatInput.value,
      }
      otherId = otherUserId

      socket.emit('chatting', roomNumber, param)
      await fetch(`/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: roomNumber,
          sender_id: connectingUser.id,
          msg: chatInput.value,
        }),
      })
    }
  }

  function LiModel(id, name, img, msg, time) {
    this.id = id
    this.name = name
    this.msg = msg
    this.time = time
    this.img = img

    this.makeLi = () => {
      const li = document.createElement('div')
      let dom
      if (!(Number(connectingUser.id) === this.id)) {
        dom = `
          <div class="flex flex-col pl-1">
          <div class="flex items-center"><img src="asset/user${this.img}.png"
              class=" w-[25px]   rounded-[18px] bg-[${
                colorChart[this.img]
              }] bg-opacity-40 ">
            <p class="ml-1 text-[12px] font-neob">${this.name}</p>
          </div>
          <div class="flex items-end">
            <div class="max-w-[380px]   p-2 mt-1 text-sm rounded-lg bg-gray-50 font-neom">${
              this.msg
            }</div>
            <p class="ml-1 text-[10px] font-neor">2:20AM</p>
          </div>
        </div>`
      } else {
        dom = `
          <div class="flex flex-row-reverse items-end pt-3">
          <div class="max-w-[380px]   p-2 mt-1 text-sm rounded-lg bg-purple-100 font-neom">${this.msg}</div>
          <p class="ml-1 text-[10px] font-neor mr-1">${this.time}</p>
        </div>
          `
      }
      li.innerHTML = dom
      chatList.appendChild(li)
    }
  }
})
