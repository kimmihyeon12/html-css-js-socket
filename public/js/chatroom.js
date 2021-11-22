'use strict'
const friendList = document.querySelector('.friend-list')
window.addEventListener('DOMContentLoaded', async () => {
  const chatUser = await fetch(`/mychat`)
    .then((response) => response.json())
    .then((data) => data)
  console.log(chatUser)
  for (let i = 0; i < chatUser.length; i++) {
    const li = document.createElement('li')
    li.className = `li${i} flex items-center mt-[2vw] ml-[2vw]`
    li.innerHTML = `
    <img class="w-[10vw] h-[10vw] rounded-full mr-3 " src=${
      chatUser[i].img === null
        ? 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg'
        : chatUser[i].img
    } alt="">
    <p class="user-name${i} text-[2.8vw] w-[10vw] ">${chatUser[i].name}</p>
    <p class="user-chat${i} text-[2.8vw] w-[60vw]  cursor-pointer">${
      chatUser[i].message_content
    }</p>
    <p class="user-name${i} text-[2.8vw]   ">${chatUser[i].time}</p>`

    chatList.appendChild(li)
    document.querySelector(`.user-chat${i}`).addEventListener('click', (e) => {
      const id = chatUser[i].id
      location.href = `/chat/${id}`
    })
  }
})
