$('.dss-login-loginBtn').addEventListener('click', doLogin)


async function doLogin() {
  const account = $('.login-phone input').value
  const password = $('.login-password input').value
  const loginUrl = '/backend/manager/login'

  if (!(checkAccount(account) && checkPassword(password))) return

  const result = await fetch(loginUrl + '?account=' + account + '&password=' + password, {
    method: 'POST'
  })

  // 请求
  if (result.ok) {
    const data = await result.json()

    if (data.code !== '200') {
      LightTip.error(data.message)
      return
    }
    LightTip.success(data.message)
    const mid = data.retData.mid
    setCookie('masterLoginStatus', 'true')
    setCookie('master', mid)
    location.replace('../../index.html')
    return
  }
  LightTip.error('请检查你的网络')
}