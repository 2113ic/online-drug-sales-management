/**
 * Object with methods to handle browser cookies.
 */
export const Cookie = {
  /**
   * Set a cookie.
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {Object} [options={}] - Additional cookie options.
   * @param {string} [options.path='/'] - The cookie path.
   * @param {number} [options.maxAge=604800] - The cookie's maximum age in seconds (default 1 week).
   * @param {Date} [options.expires] - The cookie's expiration date.
   * @param {string} [options.domain] - The cookie's domain.
   * @param {boolean} [options.secure] - Whether the cookie should only be sent over a secure connection.
   * @param {'strict' | 'lax' | 'none'} [options.sameSite] - The cookie's same-site attribute.
   */
  set(name, value, options = {}) {
    const {
      path = '/',
      maxAge = 604800,
      domain,
      expires,
      secure,
      sameSite,
    } = options

    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    if (expires instanceof Date) {
      cookie += '; expires=' + expires.toUTCString()
    } else if (maxAge) {
      cookie += '; max-age=' + maxAge
    }

    if (domain) {
      cookie += '; domain=' + domain
    }

    if (path) {
      cookie += '; path=' + path
    }

    if (secure) {
      cookie += '; secure'
    }

    if (sameSite) {
      cookie += '; sameSite=' + sameSite
    }

    document.cookie = cookie
  },

  /**
   * Get a cookie's value by its name.
   * @param {string} name - The name of the cookie.
   * @returns {string|undefined} - The value of the cookie or undefined if the cookie doesn't exist.
   */
  get(name) {
    const matches = document.cookie.match(
      new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[3]) : undefined
  },

  /**
   * Remove a cookie by setting its max-age to -1.
   * @param {string} name - The name of the cookie to remove.
   */
  remove(name) {
    this.set(name, '', {
      maxAge: -1,
      path: '/',
    })
  },
}

/**
 * Extract the first number found in a string.
 * @param {string} str - The input string.
 * @returns {string|undefined} - The first number found in the string, or undefined if no number is found.
 */
export function getNumberByString(str) {
  const matches = /\d+/.exec(str)
  return matches ? matches[0] : undefined
}

/**
 * Encodes an object as form data and returns the encoded string.
 * @param {Object} params - An object containing the key-value pairs to encode.
 * @returns {string} The encoded form data.
 */
export function encodeFormParams(params) {
  const formData = new URLSearchParams()
  for (const key in params) {
    const value = params[key]
    formData.append(key, value)
  }
  return formData.toString()
}

/**
 * Multiplies the price by the count and returns the formatted result.
 *
 * @param {number} price - The price to be multiplied.
 * @param {number} count - The count by which the price should be multiplied.
 * @returns {string} - The formatted result of the multiplication.
 */
export function multiplyPrices(price, count) {
  const result = price * count
  const resultInCents = Math.round(result * 100)
  const resultInDollars = Number((resultInCents / 100).toFixed(2))

  return resultInDollars
}

/**
 * Formats the price by adding a currency symbol.
 *
 * @param {number} price - The price to be formatted.
 * @returns {string} - The formatted price with a currency symbol.
 */
export function formatPrice(price) {
  const formattedPrice = price.toLocaleString()
  const currencySymbol = '￥'

  return formattedPrice.concat(currencySymbol)
}
