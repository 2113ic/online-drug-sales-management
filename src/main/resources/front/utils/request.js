import { encodeFormParams } from '/front/utils/common.js'

/**
 * 发送 HTTP 请求
 *
 * @async
 * @param {string} url - 请求的 URL
 * @param {object} [options={}] - 请求配置选项
 * @param {string} [options.method='GET'] - 请求的方法
 * @param {object} [options.headers={}] - 请求头
 * @param {object} [options.body] - POST 或 PUT 请求的请求体
 * @returns {Promise<any>} 返回响应数据
 * @throws {Error} 如果请求失败或响应不是 JSON 格式
 */
export default async function request(url, options = {}) {
  // 设置默认的 options
  options.method = options.method || 'GET'
  options.headers = options.headers || {}

  // 如果是 POST 或 PUT 请求，添加请求体
  if (['POST', 'PUT'].includes(options.method) && options.body) {
    const contentType = options.headers['Content-Type']

    if (contentType.includes('application/json')) {
      options.body = JSON.stringify(options.body)
    }
    if (contentType.includes('application/x-www-form-urlencoded')) {
      options.body = encodeFormParams(options.body)
    }
  }

  // 发送请求
  let response
  try {
    response = await fetch(url, options)
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`)
  }

  // 处理响应
  const contentType = response.headers.get('content-type')
  let responseData
  if (contentType && contentType.includes('application/json')) {
    try {
      responseData = await response.json()
    } catch (error) {
      throw new Error(`Failed to parse response as JSON: ${error}`)
    }
  } else {
    try {
      responseData = await response.text()
    } catch (error) {
      throw new Error(`Failed to read response body: ${error}`)
    }
  }

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${responseData}`
    )
  }

  return responseData
}
