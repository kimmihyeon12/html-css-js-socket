const calenderRepository = require('../repository/calender.repository')
exports.createCalender = async (req, res) => {
  const id = 1
  const { title, startTime, endTime } = req.body
  const result = await calenderRepository.insert(id, title, startTime, endTime)
  return res.status(200).json(result)
}

exports.showCalender = async (req, res) => {
  const id = 1
  const result = await calenderRepository.select(id)
  return res.status(200).json(result)
}
