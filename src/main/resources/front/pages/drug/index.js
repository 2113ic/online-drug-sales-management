import '/front/common/module/Header.js'
import { Cookie } from '/front/utils/common.js'
import { getDrugsByDid } from '/front/api/drug.js'
import { addToCart } from '/front/api/cart.js'
import Base from '/front/Base/index.js'

class DrugMain extends Base {
  constructor(selector) {
    super(selector)

    this.did = location.search.substring(5)
    LightTip.loading('加载中...')
    this.initDrugData()
  }

  initDrugData() {
    getDrugsByDid(this.did).then((data) => {
      data.cover = data.cover.split('$$')
      data.cover.pop()

      this.$data = data
      this.bindStart()
      this.cloneStart()
      this.drugNameRef.dataset.type = data.type
      this.$el.hidden = false
      document.querySelector('[type="loading"]').remove()
    })
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
  }

  countDec(e) {
    const el = e.target

    this.countInput.value = +this.countInput.value - 1
    if (this.countInput.value < 200) {
      this.countIncBtn.disabled = false
    }
    if (this.countInput.value <= 1) {
      this.countInput.value = 1
      el.disabled = true
    }
  }

  countInc(e) {
    const el = e.target

    this.countInput.value = +this.countInput.value + 1
    if (this.countInput.value > 1) {
      this.countDecBtn.disabled = false
    }
    if (this.countInput.value >= 200) {
      this.countInput.value = 200
      el.disabled = true
    }
  }

  addCart() {
    const uid = Cookie.get('user')
    if (!uid) return LightTip.error('请先登陆')

    const count = +this.countInput.value

    addToCart(uid, this.did, count).then((res) => {
      if (res.code !== 200) {
        res.message && LightTip.error(res.message)
        return
      }
      res.message && LightTip.success(res.message)
    })
  }

  fullscreenImg(e) {
    if (typeof window.screenX !== 'number') return

    const el = e.target
    if (el.className !== 'foot-image') return

    if (
      runPrefixMethod(document, 'FullScreen') ||
      runPrefixMethod(document, 'IsFullScreen')
    ) {
      runPrefixMethod(document, 'CancelFullScreen')
    } else {
      runPrefixMethod(el, 'RequestFullScreen')
    }
  }
}

new DrugMain('main')

function runPrefixMethod(element, method) {
  let usablePrefixMethod
  ;['webkit', 'moz', 'ms', ''].forEach(function (prefix) {
    if (usablePrefixMethod) return
    if (prefix === '') {
      // 无前缀，方法首字母小写
      method = method.slice(0, 1).toLowerCase() + method.slice(1)
    }

    let typePrefixMethod = typeof element[prefix + method]

    if (typePrefixMethod + '' !== 'undefined') {
      if (typePrefixMethod === 'function') {
        usablePrefixMethod = element[prefix + method]()
      } else {
        usablePrefixMethod = element[prefix + method]
      }
    }
  })

  return usablePrefixMethod
}
