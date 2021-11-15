 
const friendList = document.querySelector('.friend-list')
const socket = io()
console.log('friend render')

 
// function getLocation() {
//   if (navigator.geolocation) {
//     // GPS를 지원하면
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         alert(position.coords.latitude + ' ' + position.coords.longitude)
//         console.log(position.coords.latitude + ' ' + position.coords.longitude)
//       },
//       function (error) {
//         console.error(error)
//       },
//       {
//         enableHighAccuracy: false,
//         maximumAge: 0,
//         timeout: Infinity,
//       },
//     )
//   } else {
//     alert('GPS를 지원하지 않습니다')
//   }
// }
// getLocation()
let connectUsers = [];
window.addEventListener('DOMContentLoaded', async () => {
  socket.on('connectuser', async (users) => {
    console.log("connect")
 
    users.forEach(user => {
      console.log(user)
      document.querySelector(`.user-id${user.id}`).style.backgroundColor="green"
    });
  
     
  })
  socket.on('disconnectuser', async (user) => {
    console.log("disconnect")
 
   
      document.querySelector(`.user-id${user.id}`).style.backgroundColor="#c7c7c7"
  
  
     
  })

  //모든 user정보 가져오기
  const userList = await fetch('/user')
    .then((response) => response.json())
    .then((data) => data.data)
    console.log(userList)
  // for(let i=0; i<userList.length; i++){
  //   if(userList[i].id==Number(connectUsers[i].id)){
  //     let tmp = userList[i];
  //     fruits.splice(i, 1);
  //     fruits.unshift(tmp);
  //   }
  // }
  // console.log(userList)

  for (let i = 0; i < userList.length; i++) {
    const li = document.createElement('li')
    li.className = `li${i} flex items-center mt-[2vw] ml-[2vw]`
    li.innerHTML = `
    <img class="w-[10vw] h-[10vw] rounded-full mr-3 " src=${
      userList[i].img === null
        ? 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg'
        : userList[i].img
    } alt="">
    <p class="user-id${userList[i].id} w-[3vw] h-[3vw] bg-gray-200 rounded-[3vw]" >  </p>
    <p class="user-name${i} text-[2.8vw] w-[70vw] ml-[2vw] ">${userList[i].name}</p>
    <p class="user-chat${i} text-[2.8vw]   cursor-pointer">채팅하기</p>`
    friendList.appendChild(li)
    document.querySelector(`.user-chat${i}`).addEventListener('click', (e) => {
      const id = userList[i].id
      location.href = `/chat/${id}`
    })
  }

  //로그인한 user '나'로 표시
  const data = await fetch('/user/auth')
    .then((response) => response.json())
    .then((data) => data)
 
  socket.emit('connectuser', data.data.userId)
 
  const userId = Number(data.data.userId)
  for (let i = 0; i < userList.length; i++) {
    if (userId === userList[i].id) {
      document.querySelector(`.li${i}`).remove()
      const li = document.createElement('li')
      li.className = `li${i} flex items-center pt-[2vw] pl-[2vw] border-b pb-[2vw] bg-[#c7c7c7]`
      li.innerHTML = `
        <img class="w-[10vw] h-[10vw] rounded-full mr-3 " src=${
          userList[i].img === null
            ? 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg'
            : userList[i].img
        } alt="">
        <p class="user-id${userList[i].id} w-[3vw] h-[3vw] bg-gray-200 rounded-[3vw]" >  </p>
        <p class="user-name${i} text-[2.8vw] ml-[2vw]">나</p>`
        
      friendList.prepend(li)
    }
  }
})
