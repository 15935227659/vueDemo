import Vue from 'vue'
import Router from 'vue-router'
 
import Login from '@/components/auth/login'
import Main from '@/components/common/main'
import Register from '@/components/auth/register'
// user 管理
import userList from '@/components/manage/list'
import Add from '@/components/manage/add'

// 商品
import proList from '@/components/product/list'
import addPro from '@/components/product/addPro'
// import upload from '@/components/product/upload'
// 卖家
import sellerList from '@/components/seller/list' 






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
   
    { path: '/', redirect: '/login' ,hidden:true},
    {
      path: '/regin',
      name: '注册',
      component: Register,
      hidden:true   
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden:true
    },
    {
      path: '/user',
      name: '用户管理',
      iconCls:'el-icon-message',
      component: Main,
      meta: {
        requireAuth:true //该字段用来验证这个路由时许需要登陆的
      },
       children:[
          {path:'userlist',component:userList,name:'用户列表'},
          {path:'add',component:Add,name:'新增'}
      ]
    },
    {
      path: '/user',
      name: '商品管理',
      component: Main,
      iconCls:'el-icon-share ',
      meta: {
        requireAuth:true //该字段用来验证这个路由时许需要登陆的
      },
       children:[
          {path:'proList',iconCls:'el-icon-share ',component:proList,name:'商品列表'},
           {path:'addPro',iconCls:'el-icon-share ',component:addPro,name:'发布商品'},
           {path:'upload',iconCls:'el-icon-share ',
           component:resolve => require(['@/components/product/upload'],resolve),//这种写法是为了懒加载
           name:'上传图片'}
      ]
    },
   {
      path: '/',
      name: '商家管理',
      iconCls:'el-icon-upload',
      component: Main,
      meta: {
        requireAuth:true //该字段用来验证这个路由时许需要登陆的
      },
       children:[
          {path:'sellerList',iconCls:'el-icon-upload',component:sellerList,name:'卖家列表'}
      ]
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
  
    if(store.state.user.username){
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