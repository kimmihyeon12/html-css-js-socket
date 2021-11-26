console.log('register')
const inputEl = document.querySelectorAll('input')
const submitBtn = document.querySelector('button')
const modal = document.querySelector('.modal')
modal.style.display = `none`
submitBtn.addEventListener('click', async () => {
  const result = await fetch(`/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: inputEl[0].value,
      email: inputEl[1].value,
      passwd: inputEl[2].value,
      passwdConfirm: inputEl[3].value,
    }),
  })
    .then((response) => response.json())
    .then((data) => data)
  console.log(result)
  if (result.success) {
    document.querySelector('.modal p').innerHTML = result.msg
    modal.style.display = `flex`
    setTimeout(() => {
      location.href = `/profile?${result.userId}?${inputEl[0].value}`
    }, 1500)
  } else {
    modal.style.display = `flex`
    console.log(result.msg)
    document.querySelector('.modal p').innerHTML = result.msg

    setTimeout(() => {
      modal.style.display = `none`
    }, 1500)
  }
})
