const container = document.querySelector('.test-contanier')
const maxCount = 7
//몇번째 주 인지
const weekly = 1
//주에서 앞에 몇일 있는지
const preCount = 2
let getCount = 10

let divTotalCount = preCount + getCount

let divCount = []
// divCount.push(getCount)
// const divEl = document.querySelectorAll('.test-contanier div div')
const divColorEl = document.querySelectorAll('.color-box div')
// let weeklyDiv = []
// divEl.forEach((e, index) => {
//   if (7 * (weekly - 1) < index + 1 && 7 * weekly > index) weeklyDiv.push(e)
// })
// weeklyDiv.forEach((w) => {
//   console.log(w)

// })
// divColorEl.forEach((e) => {
//   console.log(e)
// })
getDivCount()

function getDivCount() {
  if (getCount > 7) {
    let count =
      getCount -
      7 * (parseInt(divTotalCount / 7) - 1) -
      (divTotalCount - 7 * parseInt(divTotalCount / 7))
    divCount.push(count)
    getCount = getCount - count
  } else {
    if (divTotalCount >= 7) {
      divCount.push(7 - preCount)
      getCount = getCount + 1 - preCount
    } else {
      divCount.push(getCount)
    }
  }
  for (let i = 0; i < parseInt(divTotalCount / 7); i++) {
    if (getCount >= 7) {
      divCount.push(7)
      getCount = getCount - 7
    } else {
      if (getCount != 0) divCount.push(getCount)
    }
  }
  console.log(divCount)
  drow()
}
// function drow() {
//   const div = document.createElement('div')
//   console.log(weekly)
//   weekly - 1 === 0
//     ? (div.className = `flex flex-col border absolute top-[0]`)
//     : (div.className = `flex flex-col border absolute top-[${
//         (weekly - 1) * 100
//       }px]`)
//   let divInner = ``
//   for (let i = 0; i < divCount.length; i++) {
//     if (i === 0) {
//       console.log(`divcount ${divCount[i]}`)
//       // console.log(preCount * 100)
//       divInner += `
//       <div class="flex justify-end w-[700px]">
//         <div class="w-[${divCount[i] * 100}px] h-[100px] border  bg-purple-100">
//         </div>
//       </div>

//       `
//     } else {
//       divInner += `
//       <div class="w-[${divCount[i] * 100}px] h-[100px] border   bg-purple-100">
//       </div>
//       `
//     }
//   }
//   console.log(div)
//   div.innerHTML = divInner
//   container.appendChild(div)
// }
