const userRepository = require('../repository/user.repository')

// exports.allfind = async (req, res) => {
//   const userData = await userRepository.selectAll()
//   return res.status(200).json(userData)
// }
exports.onefind = async (req, res) => {
  let id = req.params.id
  const userData = await userRepository.selectOne(id)
  //console.log(userData)
  return res.status(200).json(userData)
}
exports.allUser = async (req, res) => {
  const userData = await userRepository.selectAll()
  return res.status(200).json(userData)
}

exports.register = async (req, res) => {
  const { name, email, passwd, passwdConfirm } = req.body
  const vaildEmail = await userRepository.selectEmail(email)
  //모든 값 입력받았는지 확인
  if (name === '' || email === '' || passwd === '' || passwdConfirm === '') {
    res.send(
      "<script>alert('모든값을 입력해주세요');location.href='/register';</script>",
    )
    return
  }
  // 중복된 이메일인지 확인
  if (!vaildEmail.success) {
    res.send(
      "<script>alert('이미 존재하는 이메일 입니다');location.href='/register';</script>",
    )
    return
  }

  // 비밀번호 , 비밀번호 확인 일치하는지 확인
  if (!(passwd === passwdConfirm)) {
    res.send(
      "<script>alert('비밀번호가 일치하지 않습니다');location.href='/register';</script>",
    )
    return
  }
  // 위 모든조건 확인이 끝나면 db에 유저저장
  const result = await userRepository.insert(name, email, passwd)
  if (result.success) {
    res.send("<script>alert('환영합니다');location.href='/login';</script>")
    return
  } else {
    res.send("<script>alert('실패');location.href='/register';</script>")
    return
  }
}

exports.login = async (req, res) => {
  const { email, passwd } = req.body
  if (email === '' || passwd === '') {
    res.send("<script>alert('로그인 실패!');location.href='/login';</script>")
    return
  }

  const vaildEmail = await userRepository.selectEmail(email)
  const vaildPasswd = await userRepository.selectPw(email)
  const vaildId = await userRepository.selectId(email)
  //이메일 존재하는지 확인
  if (!vaildEmail.success) {
    //비밀번호 일치하는지 확인

    if (vaildPasswd.data[0].passwd === passwd) {
      console.log('uid 저장')
      await res.cookie('uid', vaildId.data[0].id)
      req.session.uid = vaildId.data[0].id
      // console.log(`id ${req.cookies.uid}`)
      await userRepository.updateLoginStatus(vaildId.data[0].id, true)
      // await userRepository.updateLoginAccessTime(vaildId.data[0].id)
      res.send(
        "<script>alert('로그인 완료!');location.href='/notice';</script>",
      )
      return
    }
  }
  res.send("<script>alert('로그인 실패!');location.href='/login';</script>")
  return
}
exports.logout = async (req, res) => {
  console.log('로그아웃')
  const userData = await userRepository.updateLoginStatus(
    req.cookies.uid,
    false,
  )
  res.clearCookie('uid').redirect('/login')
}
exports.disconnect = async (req, res) => {
  console.log('close')
  const userData = await userRepository.updateLoginStatus(
    req.cookies.uid,
    false,
  )
}
exports.connect = async (req, res) => {
  console.log('close')
  const userData = await userRepository.updateLoginStatus(req.cookies.uid, true)
}
