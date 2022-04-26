export const validateMobile = (rule, value, callback) => {
  if (value === '') {
    // new Error('手机号不可为空！')
    callback()
  } else {
    const mobileReg = /^1[34589]\d{9}$/
    if (!mobileReg.test(value)) {
      callback(new Error('请输入格式正确的手机号码'))
    }
    callback()
  }
}

export const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      }
    }
    callback()
  }
}
