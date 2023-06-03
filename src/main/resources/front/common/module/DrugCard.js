import Base from '/front/Base/index.js'

class DrugCard extends Base {
  constructor(selector) {
    super(selector)
  }

  initDrugData(data, callBack) {
    const drug = data.map((item) => {
      item.cover = item.cover.split('$$')
      item.cover.pop()
      return item
    })

    this.$data = drug
    this.$el.innerHTML = ''

    this.cloneStart()
    if (callBack) callBack()
  }
}

export default new DrugCard('.drug-cards')
