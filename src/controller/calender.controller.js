const calenderRepository = require('../repository/calender.repository')
exports.createCalender = async (req, res) => {
  const { id } = req.body
  const { title, startTime, endTime } = req.body
  const result = await calenderRepository.insert(id, title, startTime, endTime)
  return res.status(200).json(result)
}

exports.showCalender = async (req, res) => {
  const id = req.params.id
  const result = await calenderRepository.select(id)
  return res.status(200).json(result)
}
exports.updateDateCalender = async (req, res) => {
  const { id } = req.body
  const { cal_id, startTime, endTime } = req.body
  const result = await calenderRepository.updateDate(
    id,
    cal_id,
    startTime,
    endTime,
  )
  console.log(result)
  // return res.status(200).json(result)
}
