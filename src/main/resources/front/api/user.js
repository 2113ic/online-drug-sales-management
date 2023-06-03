import request from '../utils/request.js'

/**
 * 用户登录
 * @param {object} credentials - 登录凭证，包含手机号和密码
 * @param {string} credentials.phone - 手机号
 * @param {string} credentials.password - 密码
 * @returns {Promise} 一个 Promise 对象，resolve 时返回服务器的响应结果。
 */
export function signIn({ phone, password }) {
  const url = '/front/user/login'

  return request(url, {
    method: 'POST',
    body: { phone, password },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
}

/**
 * 用户注册
 * @param {object} userInfo - 用户信息，包含昵称、手机号和密码
 * @param {string} userInfo.name - 昵称
 * @param {string} userInfo.phone - 手机号
 * @param {string} userInfo.password - 密码
 * @returns {Promise} 一个 Promise 对象，resolve 时返回服务器的响应结果。
 */
export function signUp({ name, phone, password }) {
  const url = '/front/user/regist'

  return request(url, {
    method: 'POST',
    body: { name, phone, password },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
}

/**
 * 获取用户
 *
 * @param {number} uid - 用户ID
 * @returns {Promise<string>} 包含用户的 Promise 对象
 */
export function getUser(uid) {
  const url = '/front/user/getUserName'

  return request(`${url}?uid=${uid}`)
}

/**
 * 更新用户名称
 *
 * @param {number} uid - 用户ID
 * @param {string} name - 新的用户名
 * @returns {Promise} 表示更新操作是否成功的 Promise 对象
 */
export function updateUserName(uid, name) {
  const url = '/front/user/updateName'

  return request(`${url}?uid=${uid}&name=${name}`)
}

/**
 * 更新用户密码
 *
 * @param {number} uid - 用户ID
 * @param {string} password - 新的密码
 * @returns {Promise} 表示更新操作是否成功的 Promise 对象
 */
export function updateUserPassword(uid, password) {
  const url = '/front/user/updatePassword'

  return request(`${url}?uid=${uid}&password=${password}`)
}

/**
 * 更新用户地址
 *
 * @param {number} uid - 用户ID
 * @param {string} address - 新的地址
 * @returns {Promise} 表示更新操作是否成功的 Promise 对象
 */
export function updateUserAddress(uid, address) {
  const url = '/front/user/updateAddress'

  return request(`${url}?uid=${uid}&address=${address}`)
}
