import router from './router'
import store from './store'
import vue from 'vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// register global progress.
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (store.getters.token) // 判断是否有token
  {
    if (to.path === '/login') next({ path: '/' })
    else {
      if (store.getters.roles.length === 0){ // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          const roles = res.data.role
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to }) // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } 

      else {
        store.dispatch('getNowRoutes', to);
        if (store.getters.roles.indexOf('admin') >= 0){ // 是否可以登录
          next()//
          console.log("has userinfo")
        } 
        else next({ path: '/', query: { noGoBack: true }})
      }
    }
  } 
  else {
    if (to.path === '/login') next() // 直接进入
    else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
