const userRepository = require('../repository/user.repository')

exports.register = async (req, res) => {
  const { name, email, passwd, passwdConfirm } = req.body
  const vaildEmail = await userRepository.selectEmail(email)
  //모든 값 입력받았는지 확인
  if (name === '' || email === '' || passwd === '' || passwdConfirm === '') {
    return res.status(200).json({
      data: {
        success: false,
        msg: '모든값을 입력해주세요',
      },
    })
  }
  // 중복된 이메일인지 확인
  if (!vaildEmail.success) {
    return res.status(200).json({
      data: {
        success: false,
        msg: vaildEmail.message,
        err: vaildEmail.err,
      },
    })
  }

  // 비밀번호 , 비밀번호 확인 일치하는지 확인
  if (!(passwd === passwdConfirm)) {
    return res.status(200).json({
      data: {
        success: false,
        msg: '비밀번호가 일치하지 않습니다',
      },
    })
  }
  // 위 모든조건 확인이 끝나면 db에 유저저장
  const result = await userRepository.insert(name, email, passwd)
  if (result.success) {
    return res.status(200).json({
      data: {
        success: true,
        msg: '회원가입성공',
      },
    })
  } else {
    return res.status(200).json({
      data: {
        success: false,
        msg: '회원가입실패',
      },
    })
  }
}
