import Base from '/front/Base/index.js'
import { Cookie, multiplyPrices, formatPrice } from '/front/utils/common.js'

// prettier-ignore
import { 
  getCarts, 
  updateDrugCount, 
  deleteCartDrug 
} from '/front/api/cart.js'

class CartView extends Base {
  constructor(selector) {
    super(selector)

    this.drugInfos = []
    this.initCartData()
  }

  initCartData() {
    this.uid = Cookie.get('user')

    getCarts(this.uid).then((data) => {
      this.$data = data.map((item) => {
        item.cover = item.cover.split('$$')
        item.cover.pop()
        item.sum = multiplyPrices(item.price, item.count)

        this.drugInfos.push({
          bid: item.bid,
          price: item.price,
          count: item.count,
          sum: item.sum,
          checked: true,
        })
        return item
      })

      this.cloneStart()
      this.updateCartPriceSum()
      console.log(data)
    })
  }

  selectAll(e) {
    const el = e.target
    const targetVal = el.checked

    this.selectAllRef[0].checked = targetVal
    this.selectAllRef[1].checked = targetVal
    this.drugItemCheckbox.forEach((item, i) => {
      item.checked = targetVal
      this.drugInfos[i].checked = targetVal
    })
    this.updateCartPriceSum()
  }

  selectedDrugItem(e) {
    const hasUncheckedItems = this.drugItemCheckbox.some(
      (item) => !item.checked
    )
    const hasCheckedItems = !hasUncheckedItems
    const id = this.getCartItem(e).id

    if (hasUncheckedItems) {
      this.uncheckSelectAll()
    } else if (hasCheckedItems) {
      this.checkSelectAll()
    }

    this.drugInfos[id].checked = e.target.checked
    this.updateCartPriceSum()
  }

  uncheckSelectAll() {
    this.selectAllRef[0].checked = false
    this.selectAllRef[1].checked = false
  }

  checkSelectAll() {
    this.selectAllRef[0].checked = true
    this.selectAllRef[1].checked = true
  }

  updateCartPriceSum() {
    let totalSum = this.drugInfos
      .filter((item) => item.checked)
      .reduce((p, c) => p + c.sum, 0)

    if (typeof totalSum === 'object') {
      totalSum = totalSum.sum
    }
    this.sumRef.innerHTML = formatPrice(totalSum.toFixed(2))
  }

  updataDrugItemSum(e, num) {
    const { cartItem, target } = this.getCartItem(e)
    target.sum = multiplyPrices(+target.price, num)
    target.count = num

    const sumNode = cartItem.querySelector('.cart-item__sum')
    sumNode.innerHTML = formatPrice(target.sum)

    updateDrugCount(this.uid, target.bid, num).then((res) => {
      this.handleResponse(res)
    })
    this.updateCartPriceSum()
  }

  delDrugItem(e) {
    const { cartItem, target, id } = this.getCartItem(e)
    cartItem.remove()

    this.drugInfos[id].checked = false
    this.updateCartPriceSum()
    deleteCartDrug(this.uid, target.bid).then((res) => {
      this.handleResponse(res)
    })
  }

  getCartItem(e) {
    const cartItem = e.target.closest('[data-target]')
    const id = cartItem.__o__.id
    const target = this.drugInfos[id]

    return { cartItem, id, target }
  }

  handleResponse(res) {
    if (res.code !== 200) {
      res.message && LightTip.error(res.message)
      return
    }
  }

  changeCountValue(e) {
    const value = e.target.value

    if (!value.match(/^\d+$/)) {
      e.target.value = 1
    }
    if (value > 200) {
      e.target.value = 200
    }
    if (value < 1) {
      e.target.value = 1
    }
    this.updataDrugItemSum(e, +value)
  }

  countDec(e) {
    const el = e.target
    const countInput = el.nextElementSibling
    const countIncBtn = countInput.nextElementSibling
    const val = +countInput.value - 1

    countInput.value = val
    if (val < 200) {
      countIncBtn.disabled = false
    }
    if (val <= 1) {
      countInput.value = 1
      el.disabled = true
    }
    this.updataDrugItemSum(e, val)
  }

  countInc(e) {
    const el = e.target
    const countInput = el.previousElementSibling
    const countDecBtn = countInput.previousElementSibling
    const val = +countInput.value + 1

    countInput.value = val
    if (val > 1) {
      countDecBtn.disabled = false
    }
    if (val >= 200) {
      countInput.value = 200
      el.disabled = true
    }
    this.updataDrugItemSum(e, val)
  }
}

export default new CartView('#cart')
