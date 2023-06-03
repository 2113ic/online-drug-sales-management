const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)


function responseHandler(res, data) {
  if (!res.ok) return false
  if (res.code !== '200') {
    data.message ? LightTip.error(data.message) : null
    return false
  }
  data.message ? LightTip.success(data.message) : null
  return true
}

async function fetchParam(url, params) {
  const p = Object.entries(params).map(item => '&' + item[0] + '=' + item[1]).join('')
  return await fetch(url + '?' + p, { method: 'POST' })
}

/**
 * 异步读取文件
 * @param {object} file 文件对象
 * @returns file的promise
 */
function readFileAsync(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = evt => resolve(evt.target.result)
    reader.readAsText(file)
  })
}

/**
 * 创建元素
 * @param {element} ele 元素
 * @param {object} property element属性
 * @returns element
 */
function createElement(ele, property, style) {
  const element = document.createElement(ele)

  for (const [key, value] of Object.entries(property)) {
    element[key] = value
  }
  for (const [key, value] of Object.entries(style)) {
    element.style[key] = value
  }
  return element
}

/**
 * 克隆节点
 * @param {element} node 需要克隆的节点
 * @param {number} num 克隆数量
 * @param {Boolean} deep 可选。克隆深度。默认为false
 * @param {element} parentNode 可选。需要克隆到的节点。默认值为父节点。
 * @param {pattern} pattern 可选。插入方式。默认为添加到末尾。
 */
function cloneNode(node, num, deep, parentNode, pattern) {
  const container = parentNode || node.parentNode
  const pat = pattern || 'append'
  deep = deep || false
  for (let i = 0; i < num; i++) {
    const cloneNode = node.cloneNode(deep)
    container[pat](cloneNode)
  }
}

/**
 * 异步请求返回Json
 * @param {String} url url
 * @returns p
 */
async function getJsonData(url) {
  return await (await fetch(url)).json()
}

function countdown(e) {
  var sandCodeBtn = e.target
  sandCodeBtn.disabled = true

  var counter = 60
  sandCodeBtn.innerHTML = counter-- + 's'
  var sandCodeTimer = setInterval(function() {
    if (counter === 0) {
      sandCodeBtn.disabled = false
      sandCodeBtn.innerHTML = '重新发送'
      clearInterval(sandCodeTimer)
      return
    }
    sandCodeBtn.innerHTML = counter-- + 's'
  }, 1000)
}

function checkName(name) {
  if (!name) {
    LightTip.error('昵称不能为空')
    return false
  }
  return true
}

function checkAccount(account) {
  if (!account) {
    LightTip.error('账号不能为空')
    return false
  }
  return true
}

function checkPhone(phone) {
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

function checkPassword(password) {
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

function checkCode(code) {
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

function checkPasswordEquality(password, rePassword) {
  if (checkPassword(password) === checkPassword(rePassword)
    && password === rePassword) {
    return true
  }

  LightTip.error('密码不一致')
  return false
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    'max-age': 3600 * 24 * 7,
    ...options
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  document.cookie = updatedCookie
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1
  })
}

function getNumberByString(str) {
  return /\d+/.exec(str)[0]
}