const multiRoomMessageRepository = require('../repository/multiRoomMessage.repository')

exports.newMessage = async (req, res) => {
  const { sender_id, msg } = req.body
  const result = await multiRoomMessageRepository.insert(sender_id, msg)
  console.log(result)
  // return res.status(200).json(userData)
}
exports.showMessage = async (req, res) => {
  console.log('showmessage')
  const result = await multiRoomMessageRepository.select()
  console.log(result)
  return res.status(200).json(result.data)
}
