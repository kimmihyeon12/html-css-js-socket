const mychatRepository = require('../repository/mychat.repository')
exports.showChat = async (req, res) => {
  const user_id = req.session.user_id
  const result = await mychatRepository.select(user_id)
  return res.status(200).json(result.data)
}
