
# vueDemo

> vue.js2.0简单的一个会员管理，包括登录，注册，列表，删除，翻页，新增


> 技术栈

      vue-cli     vuecli脚手架
      
      element-UI  页面样式布局
      
      axios       页面的ajax请求，拦截器
      
      vuex        状态管理（结合sessionStorage完成刷新页面不会丢失数据）
      
      vue-router  项目路由管理，初步权限管理
      
      webpack     项目打包
      
      http-proxy-middleware  解决开发环境下的跨域（主要使用的代理）
      
      storage     前端缓存信息
      
      mockjs      模拟后台数据和请求处理(http://mockjs.com/)非常实用的一个工具使用了这个之后之前的跨域配置就可以先去掉了
      
      vue-quill-editor   富文本编辑器
      
      

> A Vue.js project

> 说明  这只是一个很简单vue demo ,是本人在做公司项目之前做的，主要是为了以后项目中可能会遇到的跨域问题、权限管理而做的准备工作

> 登录注册的请求地址暂时还没放在服务器上（经过修改，我已将登录注册列表的数据统一使用mockjs模拟，所以本地也已经可以操作了）

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
>>>>>>> 
