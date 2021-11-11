const { select } = require('../repository/message.repository')
const roomRepository = require('../repository/room.repository')
//룸 생성하기
exports.createRoom = async (req, res) => {
  let { id1 } = req.body
  let id2 = req.cookies.uid

  let temp = 0
  if (id1 > id2) {
    temp = id1
    id1 = id2
    id2 = temp
  }
  console.log(`id1 $${id1} id2 ${id2}`)
  const selectResult = await roomRepository.select(id1, id2)
  let room_id
  console.log(selectResult)
  //현재 채팅방이 없는 상태이면
  if (selectResult.data.length == 0) {
    const result = await roomRepository.insert(id1, id2)
    console.log(result)
    room_id = result.data.insertId
  } else {
    room_id = selectResult.data[0].room_id
  }

  console.log(`room_id ${room_id}`)
  return res.status(200).json({ room_id: room_id })
}
// //룸번호 얻어오기
// exports.selectRoom = async (req, res) => {
//   let temp
//   if (id1 > id2) {
//     temp = id1
//     id1 = id2
//     id2 = temp
//   }
//   const result = await roomRepository.select(id1, id2)
//   console.log(result)
// }
