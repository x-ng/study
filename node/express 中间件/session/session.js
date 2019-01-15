var express = require('express')
var app = express()

var session = require("express-session")

app.use(session({
    secret: 'keyboard cat',
    name: 'session_id', // 保存在本地的cookie的一个名字
    resave: false, // 强制保存 session 即使没有变化
    saveUninitialized:true,
    cookie: {secure:false},  // https
    rolling: true
}))


// express-session 的常用方法
req.session.destroy((err) => {
  // 销毁session  
})

req.session.username = '张三'  // 设置session

req.session.username  // 获取session

req.session.cookie.maxAge = 0; // 重新设置 cookie 的过期时间

// session 保存到数据库
// 安装 express-session 和 connect-mongo
引入模块
    var session = require('express-session')
    const MongoStore = require('connect-mongo')(session)
配置中间件
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        rolling: true,
        cookie:{
            maxAge:100000
        },
        store: new MongoStore({
            url: 'mongodb://127.0.0.1:27017/student',
            touchAfter: 24 * 3600 // time period in seconds
        })
    }))






