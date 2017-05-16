// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios_lode from './service/axios_lode'

Vue.use(elementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios_lode,
  template: '<App/>',
  components: { App }
})