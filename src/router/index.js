import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Hello from '@/components/Hello'
import Register from '@/components/register'
import Child from '@/components/child'
import { getStore } from '@/config/storage'
import store from '@/store/index'


Vue.use(Router)

const router = new Router({
  mode:'history',
  base:__dirname,
  scrollBehavior (to, from, savedPosition) { //这个可以简单的实现路由改变是滚动条回到顶部
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
  },
  routes: [
    {
      path: '/',
      name: '注册',
      component: Register
     
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      children:[
        {path:'test',component:Child,name:'登录的子'}
      ]
    },
    {
      path: '/Hello',
      name: '列表',
      component: Hello,
      meta: {
        requireAuth:true //该字段用来验证这个路由时许需要登陆的
      }
    }
  ]
})
// 刷新也main时，重新赋值登录信息
if(getStore('userInfo')){
  console.log(getStore('userInfo'))
  store.commit('REMEBER_USER', getStore('userInfo'))
    
}

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth) {
  
    if(store.state.user.memberName){
      next()
    }else {
      alert("您还没有登录，不能浏览相关页面")
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next()
  }
})
//通过afterEach做的页面名称的改变
router.afterEach(( to,from ) => {
   let titles = []
   let matched = to.name
  // title动态添加
  document.title = matched
  const decode = decodeURIComponent
  // 打印路由
  if(process.env.NODE_ENV === 'development'){
      console.info(`[路由日志] ${decode(from.path || '')} => ${decode(to.path)}`)
  }
  
})


export default router