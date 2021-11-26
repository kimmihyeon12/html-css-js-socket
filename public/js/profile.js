const profileId = decodeURI(document.location.href.split('?')[1])
const profileName = decodeURI(document.location.href.split('?')[2])
const name = document.querySelectorAll('.profile-wrap > div > div>div ')
const nameEl = document.querySelectorAll('.profile-wrap>div>div p ')
const modal = document.querySelector('.modal')
modal.style.display = `none`
nameEl.forEach((n) => {
  n.innerHTML = profileName
})
name.forEach((n, index) => {
  document.querySelector('.profile-wrap > p ')

  n.addEventListener('click', async () => {
    n.classList.add('animate-bounce')
    console.log('img click')
    const result = await fetch(`/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: profileId,
        imgId: index + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.data)
    if (result) {
      document.querySelector('.modal p').innerHTML = `프로필선택 완료`
      modal.style.display = `flex`
      setTimeout(() => {
        location.href = '/login'
      }, 1500)
    }
  })
})
