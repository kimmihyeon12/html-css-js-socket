const profileRepository = require('../repository/profile.repository')
//룸 생성하기
exports.imgUpdate = async (req, res) => {
  const { userId, imgId } = req.body
  const result = await profileRepository.update(userId, imgId)
  console.log(result)

  return res.status(200).json({ data: result.success })
}
