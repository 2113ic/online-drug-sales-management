import request from '../utils/request.js'

/**
 * 按类型获取药品列表
 * @param {string} type - 药品类型
 * @returns {Promise} 一个 Promise 对象，resolve 时返回服务器的响应结果。
 */
export function getDrugsByType(type) {
  const url = '/front/drug/queryDrugByType'

  return request(`${url}?type=${type}`)
}

/**
 * 搜索药品
 * @param {string} q - 搜索关键字
 * @returns {Promise} 一个 Promise 对象，resolve 时返回服务器的响应结果。
 */
export function getDrugsBySearch(q) {
  const url = '/front/drug/searchDrug'

  return request(`${url}?searchText=${q}`)
}

/**
 * 根据药品ID获取药品详情
 * @param {number} did - 药品ID
 * @returns {Promise} 一个 Promise 对象，resolve 时返回服务器的响应结果。
 */
export function getDrugsByDid(did) {
  const url = '/front/drug/queryDetail'

  return request(`${url}?did=${did}`)
}
