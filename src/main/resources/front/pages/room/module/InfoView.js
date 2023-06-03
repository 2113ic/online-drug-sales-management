import Base from '/front/Base/index.js'
import { Cookie } from '/front/utils/common.js'
import {
  getUser,
  updateUserName,
  updateUserPassword,
  updateUserAddress,
} from '/front/api/user.js'

class InfoView extends Base {
  constructor(selector) {
    super(selector)

    this.initUserInfo()
  }

  initUserInfo() {
    this.uid = Cookie.get('user')

    getUser(this.uid).then((data) => {
      if (!data.address) {
        data.address = ''
      }

      this.$data = data
      this.bindStart()
    })
  }

  saveUserName(e) {
    e.preventDefault()

    const name = this.nameInputRef.value

    if (!name) return LightTip.error('昵称不能为空')
    updateUserName(this.uid, name).then((res) => {
      if (res.code !== 200) {
        res.message && LightTip.error(res.message)
        return
      }
      LightTip.success(res.message)
      this.infoNameRef.innerHTML = name
    })
  }

  saveUserAddress(e) {
    e.preventDefault()

    const address = this.addressInputRef.value

    if (!address) return LightTip.error('地址不能为空')
    updateUserAddress(this.uid, address).then((res) => {
      if (res.code !== 200) {
        res.message && LightTip.error(res.message)
        return
      }
      LightTip.success(res.message)
      this.infoAddressRef.innerHTML = address
    })
  }

  doRevisePassword(e) {
    e.preventDefault()

    // prettier-ignore
    const { 
      phone, 
      code, 
      password, 
      confirmPassword 
    } = this.getRevisePasswordParam()

    if (
      this.validPhone(phone) &&
      this.validCode(code) &&
      this.validPassword(password) &&
      this.validConfirmPassword(password, confirmPassword)
    ) {
      updateUserPassword(phone, md5(password)).then((res) => {
        if (res.code !== 200) {
          res.message && LightTip.error(res.message)
          return
        }
        LightTip.success(res.message)
      })
    }
  }

  getRevisePasswordParam() {
    return {
      phone: this.revisePhone.value,
      code: this.reviseCode.value,
      password: this.revisePassword.value,
      confirmPassword: this.reviseConfirmPassword.value,
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

export default new InfoView('#info')
