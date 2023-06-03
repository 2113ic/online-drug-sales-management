// ==UserScript==
// @name         药物采集脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  这是一个采集药品数据的脚本
// @author       You
// @match        https://www.yaofangwang.com/medicine/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yaofangwang.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict'

  const $ = selector => document.querySelector(selector)
  const $$ = selector => document.querySelectorAll(selector)

  initDrugsStorage()
  // 跳转到说明书页
  $('#guideBtn').click()
  getDrugsData()
  addDownloadBtn()

  function initDrugsStorage() {
    const drugs = localStorage.getItem('drugs')

    if (!drugs) {
      localStorage.setItem('drugs', '[]')
    }
  }

  function getDrugsData() {
    const drugs = JSON.parse(localStorage.getItem('drugs'))
    const drugId = getDrugId()

    if (drugs.findIndex(item => item.did === drugId) == -1) {
      drugs.push({
        did: drugId,
        name: getDrugName(),
        cover: getDrugCover(),
        price: getDrugPrice(),
        type: getDrugType(),
        sort: getDrugSort(),
        traits: getDrugTraits(),
        function: getDrugFunction(),
        format: getDrugFormat(),
        store: getDrugStore(),
        eat: getDrugEat(),
        bad: getDrugBad(),
        ban: getDrugBan(),
        note: getDrugNote(),
        company: getDrugCompany(),
        shelfLife: getDrugShelfLife(),
        count: getDrugCount()
      })
      try {
        localStorage.setItem('drugs', JSON.stringify(drugs))
      } catch (error) {
        console.error(error)
      }
    }
    console.log(drugs)
  }

  function getDrugCount() {
    const count = $('[rel="slist"]').innerHTML

    return +getNumberByString(count) * 10
  }

  // 保质期
  function getDrugShelfLife() {
    return $('.subinfo + .maininfo dd:nth-last-of-type(3) p').innerHTML
  }

  // 供应商名
  function getDrugCompany() {
    const company = $('.subinfo dl dd:last-child a')

    return company.innerHTML
  }

  // 注意事项
  function getDrugNote() {
    return $('.subinfo + .maininfo dd:nth-of-type(6) p').innerHTML
  }

  // 禁忌
  function getDrugBan() {
    return $('.subinfo + .maininfo dd:nth-of-type(5) p').innerHTML
  }

  // 不良反应
  function getDrugBad() {
    return $('.subinfo + .maininfo dd:nth-of-type(4) p').innerHTML
  }

  // 用法用量
  function getDrugEat() {
    return $('.subinfo + .maininfo dd:nth-of-type(3) p').innerHTML
  }

  // 储存方式
  function getDrugStore() {
    return $('.subinfo + .maininfo dd:nth-last-of-type(4) p').innerHTML
  }

  // 规格
  function getDrugFormat() {
    const format = $('#standardOther .now').firstChild.data

    return format
  }

  // 主治功能
  function getDrugFunction() {
    return $('.subinfo + .maininfo dd:nth-of-type(2) p').innerHTML
  }

  // 性状
  function getDrugTraits() {
    return $('.subinfo + .maininfo dd:nth-of-type(1) p').innerHTML
  }

  // 分类（处方、非处方
  function getDrugSort() {
    const sort = $('[class="icons rx"]')

    return sort ? '处方' : '非处方'
  }

  // 类型
  function getDrugType() {
    const type = $('.breadcrumb a:nth-of-type(3)')

    return type.innerHTML
  }

  // 价格
  function getDrugPrice() {
    const price = $('.price .num')

    return +price.firstChild.data
  }

  // 药品封面
  function getDrugCover() {
    const cover = $$('.fblod +.simagelist a')

    return [...cover].map(item => item.href)
  }

  // 药品名
  function getDrugName() {
    const name = $('.pr0 span')

    return name.innerHTML
  }

  // 获取当前页面药品的id
  function getDrugId() {
    const pathName = window.location.pathname

    return getNumberByString(pathName)
  }

  // 通过字符串提取数字
  function getNumberByString(str) {
    return /\d+/.exec(str)[0]
  }

  // 添加下载数据按钮
  function addDownloadBtn() {
    const downloadBtn = createElement('a', {
      href: '',
      innerHTML: '下载'
    }, {
      float: 'right',
      width: '100px',
      lineHeight: '30px',
      color: '#fff',
      textDecoration: 'none',
      textAlign: 'center',
      background: '#268dcd',
      borderRadius: '2px'
    })

    downloadBtn.onclick = function() {
      const data = localStorage.getItem('drugs')

      fileDownload(data, 'drugs.json')
    }
    $('.breadcrumb').prepend(downloadBtn)
  }


  /**
   * 创建元素
   * @param {element} ele 元素
   * @param {object} property element属性
   * @returns element
   */
  function createElement(ele, property, style) {
    const element = document.createElement(ele)

    for (const [key, value] of Object.entries(property)) {
      element[key] = value
    }
    for (const [key, value] of Object.entries(style)) {
      element.style[key] = value
    }
    return element
  }

  /**
   * 文件下载
   * @param {String} content 需要下载的文件的内容
   * @param {String} filename 需要下载的文件名
   */
  function fileDownload(content, filename) {
    let eleLink = document.createElement('a')
    eleLink.download = filename
    eleLink.style.display = 'none'

    let blob = new Blob([content])
    eleLink.href = URL.createObjectURL(blob)

    document.body.appendChild(eleLink)
    eleLink.click()

    document.body.removeChild(eleLink)
  }
})()