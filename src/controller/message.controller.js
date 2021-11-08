const userRepository = require('../repository/user.repository')

exports.createRoom = async (req, res) => {
  const result = await userRepository.insert()
  console.log()
  // return res.status(200).json(userData)
}
