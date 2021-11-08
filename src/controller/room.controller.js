const roomRepository = require('../repository/room.repository')
//룸 생성하기
exports.createRoom = async (req, res) => {
  let id1 = req.params.id
  let id2 = req.session.user_id

  let temp = 0
  if (id1 > id2) {
    temp = id1
    id1 = id2
    id2 = temp
  }
  console.log(`id1 $${id1} id2 ${id2}`)
  const selectResult = await roomRepository.select(id1, id2)
  //현재 채팅방이 없는 상태이면
  console.log(selectResult.data.length)
  if (selectResult.data.length == 0) {
    const result = await roomRepository.insert(id1, id2)
    console.log(result)
  } else {
    console.log(selectResult)
  }

  console.log(result)
  // const result = await roomRepository.insert()
  // console.log(result)
  // return res.status(200).json(userData)
}
//룸번호 얻어오기
exports.selectRoom = async (req, res) => {
  let temp
  if (id1 > id2) {
    temp = id1
    id1 = id2
    id2 = temp
  }
  const result = await roomRepository.select(id1, id2)
  console.log(result)
}
