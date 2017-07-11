require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var ejs = require('ejs')

var bodyParser = require('body-parser')
var ueditor = require("ueditor")

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyTable = config.dev.proxyTable

var app = express()

// 富文本处理
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'static')))
// app.set('views',path.join(__dirname,'views'))
// app.engine('.html',ejs.__express)
// app.set('view engin','html')

app.use("/ueditor/ue", ueditor(path.join(__dirname,'static'),function(req,res,next) {
 
  //客户端上传文件设置
  // var imgDir = '/img/ueditor'
  var imgDir = '/upload'
  var ActionType = req.query.action
   console.log(ActionType)
  if(ActionType === 'upload' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
    var file_url = imgDir;//默认图片上传地址
    // 其他上传格式地址
    if(ActionType === 'uploadfile') {
      file_url = '/file/ueditor/';
    }
    if(ActionType === 'uploadvideo') {
      file_url = '/video/ueditor/'
    }
   
   //res.setheader('Content-Type','text/html')
    res.ue_up(file_url);//你只要输入要保存的地址，保存操作交个ueditor
    // 客户端发起图片列表请求
  }else if(req.query.action === 'listimage'){
    var dir_url = imgDir
    res.ue_list(dir_url);//客服端会列出dir_url 目录下的所有图片
    // 客户端发起其他请求
  }else{
     res.setHeader('Content-Type','application/json');
     res.redirect('/static/ueditor/nodejs/config.json');
  }
  
}))



var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
var proxyPath = config.dev.proxypath
var context = config.dev.context

var options = {
  target: proxyPath,
  changeOrigin: true,
}
if(context.length) {
  app.use(proxyMiddleware(context,options))
}
// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options,changeOrigin: true }
//   }
//   app.use(proxyMiddleware(context, options || options.filter))
// })
// app.use(proxyMiddleware('/m.ele.me@json', {
//     target: 'https://crayfish.elemecdn.com',
//     changeOrigin: true,
// }))
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
