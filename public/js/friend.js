import { userList } from '../js/data/user.js'

const friendList = document.querySelector('.friend-list')
for (let i = 0; i < userList.length; i++) {
  const li = document.createElement('li')
  li.className = `li${i} flex items-center mt-[2vw] ml-[2vw]`
  li.innerHTML = `
  <img class="w-[10vw] h-[10vw] rounded-full mr-3 " src=${userList[i].img} alt="">
  <p class="user-name${i} text-[2.8vw]">${userList[i].name}</p>
  <p class="user-chat${i} text-[2.8vw] ml-[60vw] cursor-pointer">채팅하기</p>`
  friendList.appendChild(li)
  document.querySelector(`.user-chat${i}`).addEventListener('click', (e) => {
    const id = userList[i].id
    location.href = `/chat/${id}`
  })
}

// 로그인한 id 와 db에(아직x) 있는 id 같으면 '나'로 표시
window.addEventListener('DOMContentLoaded', async () => {
  const data = await fetch('http://localhost:5000/user/auth')
    .then((response) => response.json())
    .then((data) => data)
  const userId = data.data.userId
  for (let i = 0; i < userList.length; i++) {
    if (userId === userList[i].id) {
      document.querySelector(`.li${i}`).remove()
      const li = document.createElement('li')
      li.className = `li${i} flex items-center pt-[2vw] pl-[2vw] border-b pb-[2vw] bg-[#c7c7c7]`
      li.innerHTML = `
      <img class="w-[10vw] h-[10vw] rounded-full mr-3 " src=${userList[i].img} alt="">
      <p class="user-name${i} text-[2.8vw] ">나</p>`
      friendList.prepend(li)
    }
  }
})
