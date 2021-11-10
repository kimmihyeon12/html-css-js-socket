const messageRepository = require('../repository/message.repository')

exports.newMessage = async (req, res) => {
  console.log('createmessage')
  const { room_id, sender_id, msg } = req.body
  const result = await messageRepository.insert(room_id, sender_id, msg)
  // console.log(result)
  // return res.status(200).json(userData)
}
exports.showMessage = async (req, res) => {
  const room_id = req.params.room_id
  const result = await messageRepository.select(room_id)
  return res.status(200).json(result.data)
}
