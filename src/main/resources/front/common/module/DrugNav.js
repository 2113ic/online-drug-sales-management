import { getDrugsByType } from '/front/api/drug.js'
import Base               from '/front/Base/index.js'
import DrugCard           from '/front/common/module/DrugCard.js'

class DrugNav extends Base {
  constructor(selector) {
    super(selector, () => {
      return [
        '心脑血管',
        '风湿骨科',
        '胃肠用药',
        '肝胆用药',
        '男科用药',
        '营养滋补',
        '呼吸系统',
        '皮肤科药',
        '泌尿科药',
        '妇科用药',
        '抗肿瘤药',
        '儿科用药',
      ]
    })

    this.curType = ''
    this.cloneStart()
    this.$el.addEventListener('click', this.getDrugData.bind(this))
    this.getNode('.nav-item').click()
  }

  getDrugData(e) {
    /** @type {HTMLElement} */
    const el = e.target
    const type = el.innerHTML

    if (type === this.curType) return
    if (!el.classList.contains(this.navItem.className)) return

    this.curType = type
    LightTip.loading('加载中...')
    ;[...this.getNodeAll('.nav-item')].forEach((e) =>
      e.classList.remove('nav-active')
    )
    el.classList.add('nav-active')
    getDrugsByType(type).then((data) => {
      DrugCard.initDrugData(data, () => {
        document.querySelector('[type="loading"]').remove()
        DrugCard.$el.hidden = false
      })
    })
  }
}

export default new DrugNav('.nav')
