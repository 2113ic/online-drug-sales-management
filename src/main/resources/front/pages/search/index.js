import '/front/common/module/Header.js'
import { getDrugsBySearch } from '/front/api/drug.js'
import Base                 from '/front/Base/index.js'
import DrugCard             from '/front/common/module/DrugCard.js'

class SearchMain extends Base {
  constructor(selector) {
    super(selector)
    this.initSearch()
  }

  initSearch() {
    LightTip.loading('正在搜索')
    const searchText = decodeURI(location.search.split('=').pop())

    if (!searchText) {
      LightTip.error('搜索不能为空')
      this.searchTip.innerHTML = '查询参数异常'
      document.querySelector('[type="loading"]').remove()
      return
    }
    this.queryDrug(searchText)
  }

  queryDrug(searchText) {
    const loading = document.querySelector('[type="loading"]')

    getDrugsBySearch(searchText).then((data) => {
      const len = data.length
      const infoHtml = `找到<span class='count'>${len}</span>条结果`

      if (len !== 0) {
        DrugCard.initDrugData(data, () => {
          loading.remove()
          DrugCard.$el.hidden = false
        })
      }
      this.searchTip.innerHTML = infoHtml
    })
  }
}

new SearchMain('main')
