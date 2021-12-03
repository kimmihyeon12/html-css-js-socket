const userId = await fetch(`/user/auth`)
  .then((response) => response.json())
  .then((data) => data.data)

const userData = await fetch(`/user/:${userId.userId}`)
  .then((response) => response.json())
  .then((data) => data.data)
console.log(userData)
