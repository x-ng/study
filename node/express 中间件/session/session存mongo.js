// 安装 express-session 和 connect-mongo
    // npm i express-session --save
    // npm i connect-mongo --save
// 引入
    var session = require("express-session")
    var MongoStore = require("connect-mongo")(session)
// 设置官方文档提供的中间件
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            url: 'mongodb://127.0.0.1:27017/student', // 数据库地址
            touchAfter: 24 * 3600 
        })
    }))
