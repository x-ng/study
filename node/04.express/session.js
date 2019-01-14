// Session的工作流程
// 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于
// key,value的键值对，然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，
// 找到对应的session(value)。 客户的信息都保存在session中

// express-session 的使用
    // 安装 express-session
    // cnpm i express-session --save
    // 引入 express-session
    // var session = require('express-session')
    // 设置官方文档提供的中间件
    // app.use(session({
    //     secret:'ketboard cat',
    //     resave: true,
    //     saveUninitialized: true,
    // }))
    // 使用
    // 设置值 req.session.username = 'zhangsan'
    // 获取值 req.session.username

// express-session 常用参数
    app.use(session({
        secret:'123456',
        name: 'name',
        cookie:{maxAge:600000},
        resave: false,
        saveUninitialized: true
    }))

// express-session 的常用方法
    req.session.destory((err) => {
        // 销毁 session
    })
    req.session.username = '张三'  // 设置 session
    req.session.username    // 获取 session
    req.session.cookie.maxAge = 0; // 重新设置cookie的过期时间