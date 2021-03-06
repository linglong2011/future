// 引用expess
const express = require('express');

// 创建服务器
const app = express();

// 引入orm
const orm = require('orm')

// 导入config模块
const config = require('config');
// 获取数据库配置参数
const protocol = config.get('db_config.protocol'), user = config.get('db_config.user'), password = config.get('db_config.password'), host = config.get('db_config.host'), port = config.get('db_config.port'), database = config.get('db_config.database')

//  模版引擎配置
app.set('view engine', 'ejs')

// 开发 /public/ 文件夹下资源配置
app.use("/public/", express.static("./public/"))

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.setHeader('Content-Type', 'multipart/form-data')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next();
});

// 挂载数据库及所有的模型文件
app.use(orm.express(`${protocol}://${user}:${password}@${host}:${port}/${database}`,
  {define: require('./models/index')}
))

// 引入前端路由模块
const home = require('./routes/home');

// 引入管理端路由模块
const admin = require('./routes/admin');

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.get('/', function (req, res) {
    res.send('7');
});

// 404 处理 所要未处理的请求路径都会在这里处理
app.use(function(req,res){
	res.render('404',{})
})

// 设置监听端口
app.listen(3000, () => console.log('Example app listening on port on http://localhost:3000/ '))