console.log('multichat')
const friendList = document.querySelector('.user-list')
const chatEl = document.querySelector('.chat')
const sendButton = document.querySelector('.send-button')
const chatList = document.querySelector('.chat-list')
let chatInput = document.querySelector('.chatting-input')
const displayContainer = document.querySelector('.display-container')
const socket = io()
// 로그인한 user
let userLists = []
let connectingUser
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
  //displayContainer.scrollTop = displayContainer.scrollHeight

  const userData = await fetch(`/user/auth`)
    .then((response) => response.json())
    .then((data) => data.data)
  console.log(userData.userId)

  const userList = await fetch('/user')
    .then((response) => response.json())
    .then((data) => data.data)
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id.toString() === userData.userId.toString()) {
      console.log('같아요!!~')
      console.log(userList[i])
      connectingUser = userList[i]
    }
  }
  const backupMessage = await fetch(`/multiRoomMessage`)
    .then((response) => response.json())
    .then((data) => data)
  console.log(backupMessage)
  backupMessage.forEach((message) => {
    const item = new LiModel(
      message.sender_user_id,
      message.name,
      message.img,
      message.message_content,
      message.times,
    )
    item.makeLi()
  })
  displayContainer.scrollTop = displayContainer.scrollHeight

  socket.emit('multiconnectuser', connectingUser)

  socket.on('multiconnectuser', async (users) => {
    console.log('m connect')
    userLists = []
    for (let i = 0; i < users.length; i++) {
      console.log(users[i])
      userLists.push(users[i])
    }
    UserView(userLists)
  })
  socket.on('multidisconnectuser', async (user) => {
    console.log('m disconnect')
    console.log(user)
    for (let i = 0; i < userLists.length; i++) {
      if (userLists[i].id === user.id) {
        userLists.splice(i, 1)
      }
    }
    console.log(userLists)
    UserView(userLists)
  })

  socket.on('multichatting', async (data) => {
    const { id, name, img, msg, time } = data
    const item = new LiModel(id, name, img, msg, time)
    item.makeLi()
    displayContainer.scrollTop = displayContainer.scrollHeight
    // let chatContent = document.querySelector(`.chat-content${otherId}`)
    // console.log(chatContent)
    //  chatContent.innerHTML = msg
    chatInput.value = ''
  })

  sendButton.addEventListener('click', () => {
    console.log(connectingUser)
    submit()
  })
  chatInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      console.log('enter')
      submit()
    }
  })
  async function submit() {
    const param = {
      id: connectingUser.id,
      name: connectingUser.name,
      img: connectingUser.img,
      msg: chatInput.value,
    }
    // otherId = otherUserId

    socket.emit('multichatting', param)
    await fetch(`/multiRoomMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: connectingUser.id,
        msg: chatInput.value,
      }),
    })
  }
})

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

function UserView(userLists) {
  while (friendList.hasChildNodes()) {
    // 부모노드가 자식이 있는지 여부를 알아낸다
    friendList.removeChild(friendList.firstChild)
  }
  for (let i = 0; i < userLists.length; i++) {
    console.log(userLists[i])
    const li = document.createElement('li')

    li.className = `li${i} flex items-center mb-2 cursor-pointer `
    li.innerHTML = `
  <div class="relative mr-1">
    <img src=${
      userLists[i].img === null
        ? `asset/user1.png`
        : `asset/user${userLists[i].img}.png`
    } class="  w-[30px] h-[30px] border-2 shadow-md rounded-3xl   bg-opacity-40 ">
      <div
      class=" flex absolute top-[18px] left-[18px] items-center justify-center w-[12px] h-[12px] bg-white rounded-3xl">
        <div class="user-id${
          userLists[i].id
        } w-[8px] h-[8px]  bg-[#74DF00] rounded-3xl"></div>
      </div>
    </div>
    <p class="user-name${i} text-sm font-neom text-gray-700">${
      userLists[i].name
    }</p>
  </div>`
    friendList.appendChild(li)
  }
}
