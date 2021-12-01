// console.log(document.location.href.split('/')[3])
const bell = document.querySelector('.fa-bell')
const user = document.querySelector('.fa-user')
const comments = document.querySelector('.fa-comments')
const calendar = document.querySelector('.fa-calendar-alt')
const navname = document.location.href.split('/')[3]

if (navname === 'multiChat') {
  bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  user.classList = 'fas fa-user text-lg  p-4 text-[#a7a7aa]'
  calendar.classList = 'fas fa-calendar-alt text-lg  p-4 text-[#a7a7aa]'
  comments.classList =
    'fas fa-comments text-lg  pl-[15px] pr-[15px] pt-[16px] pb-[16px] text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
} else if (navname === 'oneToOneChat') {
  bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  comments.classList = 'fas fa-comments text-lg  p-4 text-[#a7a7aa]'
  calendar.classList = 'fas fa-calendar-alt text-lg  p-4 text-[#a7a7aa]'
  user.classList =
    'fas fa-user text-lg  p-4 text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
} else if (navname === 'fullcalendar') {
  bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  comments.classList = 'fas fa-comments text-lg  p-4 text-[#a7a7aa]'
  user.classList = 'fas  fa-user text-lg  p-4 text-[#a7a7aa]'
  calendar.classList =
    'fas fa-calendar-alt text-lg  p-4 text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
}

bell.addEventListener('click', () => {
  // user.classList = 'fas fa-user text-lg  p-4 text-[#a7a7aa] '
  // comments.classList = 'fas fa-comments text-lg  p-4 text-[#a7a7aa]'
  // userFriends.classList = 'fas fa-user-friends text-lg  p-4 text-[#a7a7aa]'
  // bell.classList =
  //   'fas fa-bell text-lg  p-4 text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200  duration-500'

  location.href = '/notice'
})

user.addEventListener('click', () => {
  // bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  // comments.classList = 'fas fa-comments text-lg  p-4 text-[#a7a7aa]'
  // userFriends.classList = 'fas fa-user-friends text-lg  p-4 text-[#a7a7aa]'
  // user.classList =
  //   'fas fa-user text-lg  p-4 text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'

  location.href = '/oneToOneChat'
})

comments.addEventListener('click', () => {
  // bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  // user.classList = 'fas fa-user text-lg  p-4 text-[#a7a7aa]'
  // userFriends.classList = 'fas fa-user-friends text-lg  p-4 text-[#a7a7aa]'
  // comments.classList =
  //   'fas fa-comments text-lg  pl-[15px] pr-[15px] pt-[16px] pb-[16px] text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
  location.href = '/multiChat'
})
calendar.addEventListener('click', () => {
  // bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  // user.classList = 'fas fa-user text-lg  p-4 text-[#a7a7aa]'
  // userFriends.classList = 'fas fa-user-friends text-lg  p-4 text-[#a7a7aa]'
  // comments.classList =
  //   'fas fa-comments text-lg  pl-[15px] pr-[15px] pt-[16px] pb-[16px] text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
  location.href = '/fullcalendar'
})
userFriends.addEventListener('click', () => {
  bell.classList = 'fas fa-bell text-lg  p-4 text-[#a7a7aa]'
  comments.classList = 'fas fa-comments text-lg  p-4 text-[#a7a7aa]'
  user.classList = 'fas fa-user text-lg  p-4 text-[#a7a7aa]'
  userFriends.classList =
    'fas fa-user-friends text-lg  pl-[15px] pr-[15px] pt-[16px] pb-[16px] text-[#c086c5] border-2 shadow-md rounded-[300px] bg-purple-200 duration-500'
})
