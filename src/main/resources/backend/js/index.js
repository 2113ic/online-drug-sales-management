(function() {
  const mid = getCookie('master')

  if (!mid) {
    location.replace(location.origin + '/backend/pages/login/login.html')
  }
})()

initNote()
$('.dss-signOut').addEventListener('click', signOut)

layui.use('element', function() {
  const element = layui.element

  element.tab({
    headerElem: '.dss-nav-list-ul>li',
    bodyElem: '.dss-main-body>.dss-tabItem'
  })
  $('.dss-nav-list-li:nth-of-type(1)').click()
})

layui.use('table', async function() {
  const table = layui.table
  const userData = await initData('/backend/user/queryAll')
  const salesData = await initData('/backend/sale/queryCartMessage')
  const orderData = await initData('/backend/order/queryAll')
  const supplierData = await initData('/backend/supplier/queryAll')

  $('.userCount').innerHTML = userData.length
  $('.salesCount').innerHTML = orderData.length

  UserTableRender(table, userData)
  drugTableRender(table)
  saleTableRender(table, salesData)
  orderTableRender(table, orderData)
  supplierTableRender(table, supplierData)
  recycleBinTableRenderer(table)
})


async function initData(url) {
  const result = await fetch(url)

  if (!result.ok) {
    layer.msg(data.message)
    return
  }
  return await result.json() || [{}]
}

function UserTableRender(table, data) {
  table.render({
    elem: '#user-table',
    height: 500,
    //url: '/user/queryAll',
    data: data,
    page: false,
    skin: 'line',
    toolbar: true,
    cols: [[
      { field: 'uid', title: 'ID' },
      { field: 'name', title: '昵称' },
      { field: 'phone', title: '手机号' },
      { field: 'address', title: '收货地址' },
      { fixed: 'right', width: 150, align: 'center', toolbar: '#userToolbar' }
    ]]
  })
}

function drugTableRender(table, data) {
  table.render({
    elem: '#drug-table',
    height: 500,
    url: '/backend/drug/queryAll',
    method: 'POST',
    skin: 'line',
    toolbar: '#drugToolbar',
    page: true,
    cols: [[
      { field: 'did', title: 'ID' },
      { field: 'name', title: '药品名称' },
      { field: 'company', title: '生产厂商' },
      { field: 'count', title: '库存' },
      {
        fixed: 'right',
        width: 150,
        align: 'center',
        toolbar: '#drugToolbarItem'
      }
    ]],
    parseData: function(res) {
      console.log(res)
      return {
        'code': 0,
        'msg': res.message,
        'count': res.count,
        'data': res.retData
      }
    }
  })
  table.on('toolbar(drug)', function(obj) {
    const layEvent = obj.event

    if (layEvent === 'downloadTemplate') {
      downloadEvt('/backend/药品导入格式模板.xlsx', '药品导入格式模板.xlsx')
    }
  })
}

function saleTableRender(table, data) {
  table.render({
    elem: '#sales-table',
    height: 500,
    //url: '/sale/queryCartMessage',
    data: data,
    skin: 'line',
    toolbar: true,
    cols: [[
      { field: 'bid', title: 'ID' },
      { field: 'did', title: '药品ID' },
      //{field: 'uid', title: '用户id'},
      { field: 'name', title: '药品名称' },
      { field: 'format', title: '规格' },
      { field: 'price', title: '价格' },
      { field: 'count', title: '数量' }
    ]]
  })
}

function orderTableRender(table, data) {
  table.render({
    elem: '#order-table',
    height: 500,
    //url: '/order/queryAll',
    data: data,
    skin: 'line',
    toolbar: true,
    cols: [[
      { field: 'oid', title: 'ID' },
      { field: 'sname', title: '供应商' },
      { field: 'name', title: '药品名' },
      { field: 'price', title: '总价格' },
      { field: 'count', title: '订购数量' },
      { field: 'date', title: '订购日期' },
      { field: 'isaccept', title: '是否验收' }
    ]]
  })
}

function supplierTableRender(table, data) {
  table.render({
    elem: '#supplier-table',
    height: 500,
    //url: '/supplier/queryAll',
    data: data,
    skin: 'line',
    toolbar: true,
    cols: [[
      { field: 'sid', title: 'ID' },
      { field: 'name', title: '药品名称' },
      { field: 'phone', title: '联系方式' },
      { field: 'address', title: '地址' }
    ]]
  })
}

function recycleBinTableRenderer(table, data) {
  table.render({
    elem: '#recycleBin-table',
    height: 500,
    text: '你的回收站是空的',
    data: [{}],
    skin: 'line',
    toolbar: true,
    cols: [[
      { field: 'id', title: 'ID' },
      { field: 'name', title: '名称' },
      { field: 'date', title: '日期' },
      { field: 'mid', title: '管理员' }
    ]]
  })
}

importDrugMessage()

function importDrugMessage() {
  layui.use(['form', 'layer', 'element', 'upload'], function() {
    var layer = layui.layer
    var upload = layui.upload

    upload.render({
      elem: '#importDrugMessage',
      url: '/backend/drug/upload/importDrugMessage',
      accept: 'file',
      exts: 'xls|xlsx',
      field: 'excelFile',
      choose: function(res) {
        console.log(res)
      },
      done: function(res) {
        console.log(res)
        if ('200' === res.code) {
          layer.msg(res.msg, { icon: 1 })
        } else {
          layer.msg(res.msg, { icon: 2 })
        }
      },
      error: function(res) {
        //请求异常回调
        console.log(res)
      }
    })
  })
}

function downloadEvt(url, fileName = '未知文件') {
  const el = document.createElement('a')
  el.style.display = 'none'
  el.setAttribute('target', '_blank')
  fileName && el.setAttribute('download', fileName)
  el.href = url
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}

async function initNote() {
  const list = $('.dss-data-list-ul')
  const url = '/backend/drug/queryDrugByCount'
  const result = await fetch(url)
  const data = await result.json()
  cloneNode(list.firstElementChild, data.length - 1, true)
  const li = list.querySelectorAll('li')

  li.forEach((item, i) => {
    const el = item.firstElementChild
    el.innerHTML = data[i].name
    el.href = location.origin + '/front/pages/drug/drug.html?did=' + data[i].did
  })
}

function signOut() {
  deleteCookie('userLoginStatus')
  deleteCookie('user')
  location.replace(location.origin + '/backend/pages/login/login.html')
}