import { Cookie } from '/front/utils/common.js'
import { signIn, signUp } from '/front/api/user.js'
import Base from '/front/Base/index.js'

class Login extends Base {
  constructor(selector) {
    super(selector)
  }

  doSignIn(e) {
    e.preventDefault()

    const { phone, password } = this.getSignInParam()

    if (this.validPhone(phone) && this.validPassword(password)) {
      signIn({ phone, password: md5(password) }).then((res) => {
        if (res.code !== 200) {
          res.message && LightTip.error(res.message)
          return
        }
        Cookie.set('user', res.retData.uid)
        location.replace('/front/index.html')
      })
      return
    }
  }

  doSignUp(e) {
    e.preventDefault()

    // prettier-ignore
    const { 
      name, 
      phone, 
      code, 
      password, 
      confirmPassword 
    } = this.getSignUpParam()

    if (
      this.validName(name) &&
      this.validPhone(phone) &&
      this.validCode(code) &&
      this.validPassword(password) &&
      this.validConfirmPassword(password, confirmPassword)
    ) {
      signUp({ name, phone, password: md5(password) }).then((res) => {
        if (res.code !== 200) {
          res.message && LightTip.error(res.message)
          return
        }
        Cookie.set('user', res.retData.uid)
        location.replace('/front/index.html')

        return
      })
    }
  }

  getSignInParam() {
    return {
      phone: this.signInPhone.value,
      password: this.signInPassword.value,
    }
  }

  getSignUpParam() {
    return {
      name: this.signUpName.value,
      phone: this.signUpPhone.value,
      code: this.signUpCode.value,
      password: this.signUpPassword.value,
      confirmPassword: this.signUpConfirmPassword.value,
    }
  }

  countdown(e) {
    let counter = 60
    const sandCodeBtn = e.target

    sandCodeBtn.disabled = true
    sandCodeBtn.innerHTML = counter-- + 's'

    let sandCodeTimer = setInterval(function () {
      if (counter === 0) {
        sandCodeBtn.disabled = false
        sandCodeBtn.innerHTML = '重新发送'
        clearInterval(sandCodeTimer)
        return
      }
      sandCodeBtn.innerHTML = counter-- + 's'
    }, 1000)
  }

  hideLogin(e) {
    if (e.target.className !== this.loginMask.className) return
    this.loginMask.classList.add('dn')
  }

  validName(name) {
    if (!name) {
      LightTip.error('昵称不能为空')
      return false
    }
    return true
  }

  validPhone(phone) {
    const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/

    if (!phone) {
      LightTip.error('手机号不能为空')
      return false
    }
    if (phoneReg.test(phone)) {
      return true
    }

    LightTip.error('无效手机号')
    return false
  }

  validPassword(password) {
    const passwordReg = /^[a-zA-Z0-9_.@#$%^&*]{5,15}$/

    if (!password) {
      LightTip.error('密码不能为空')
      return false
    }
    if (passwordReg.test(password)) {
      return true
    }
    LightTip.error('无效密码')

    return false
  }

  validCode(code) {
    const CodeNumber = 6
    const onlyNumber = /^\d+$/

    if (code.length !== CodeNumber) {
      LightTip.error('无效验证码')
      return false
    }
    if (onlyNumber.test(code)) {
      return true
    }

    LightTip.error('无效验证码')
    return false
  }

  validConfirmPassword(password, confirmPassword) {
    if (password === confirmPassword) {
      return true
    }

    LightTip.error('密码不一致')
    return false
  }
}

export default new Login('.login-body')
