import { Cookie } from '/front/utils/common.js'
import Base       from '/front/Base/index.js'

class Header extends Base {
  constructor(selector) {
    super(selector)
    this.init()
  }

  init() {
    this.initLoginState()
  }

  initLoginState() {
    if (Cookie.get('user')) {
      this.menuTarget.classList.add('active')
      this.userAvatar.src = '/front/assets/loginAvatar.jpg'
    } else {
      this.userAvatar.addEventListener('click', () =>
        location.replace('/front/pages/login/index.html')
      )
    }
  }

  search(e) {
    e.preventDefault()

    if (!this.searchInput.value) {
      LightTip.error('搜索不能为空')
    }
    e.target.submit()
  }

  signOut() {
    Cookie.remove('user')
    location.replace('/front/index.html')
  }
}

export default new Header('header')
