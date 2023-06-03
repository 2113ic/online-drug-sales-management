import request from '../utils/request.js'

/**
 * 添加商品到购物车函数
 * @param {Object} uid 用户 ID
 * @param {Object} did 药品 ID
 * @param {Object} count 商品数量
 * @return {Promise} 返回请求 Promise
 */
export function addToCart(uid, did, count) {
  const url = '/front/cart/addCart'

  return request(url, {
    method: 'POST',
    body: {
      uid,
      did,
      count,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
}

/**
 * 从服务器获取指定用户的购物车信息
 * @param {number} uid - 需要获取购物车的用户ID
 * @returns {Promise<Object[]>} 返回请求 Promise
 */
export function getCarts(uid) {
  const url = '/front/cart/showCart'

  return request(`${url}?uid=${uid}`)
}

/**
 * 更新指定用户购物车中的药品数量
 * @param {number} uid - 需要更新购物车的用户ID
 * @param {number} bid - 要更新数量的药品ID
 * @param {number} count - 要更新的药品数量
 * @returns {Promise<Object>} 返回请求 Promise
 */
export function updateDrugCount(uid, bid, count) {
  const url = '/front/cart/updateCart'

  return request(url, {
    method: 'POST',
    body: {
      uid,
      bid,
      count,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
}

/**
 * 从购物车中删除药品
 * @param {number} uid - 用户ID
 * @param {number} bid - 购物车药品ID
 * @returns {Promise} 返回请求 Promise
 */
export function deleteCartDrug(uid, bid) {
  const url = '/front/cart/deleteCart'

  return request(`${url}?=uid=${uid}&bid=${bid}`)
}
