// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/ueditor.parse.min.js'
import '../static/ueditor//lang/zh-cn/zh-cn.js'


// import axios_lode from './service/axios_lode'
import Mock from './mock/mock'

  
Mock.bootstrap()

Vue.use(elementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  
  template: '<App/>',
  components: { App }
})
