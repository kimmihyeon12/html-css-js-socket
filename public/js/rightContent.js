const name = document.querySelector('.name')
const email = document.querySelector('.email')
const cimg = document.querySelector('.cimg')

const userId = await fetch(`/user/auth`)
  .then((response) => response.json())
  .then((data) => data.data)

const userData = await fetch(`/user/${userId.userId}`)
  .then((response) => response.json())
  .then((data) => data.data)
console.log(userData)
cimg.src = `asset/user${userData[0].img}.png`
name.innerHTML = `${userData[0].name}`
email.innerHTML = `${userData[0].email}`
