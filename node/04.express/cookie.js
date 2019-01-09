// cookie 的使用
    // 安装 cnpm i cookie-parser --save
    // 引入 var cookieParser = require('cookie-parser)
    // 设置中间件 app.use(cookieParser())
    // 设置cookie res.cookie("name","zhangsan",{maxAge:900000,httpOnly:true})
    // 获取cookie req.cookies.name

// 设置cookie
    res.cookie('rememberme','1',{maxAge:900000,httpOnly:true})
    res.cookie('name','tobi',{domin:'.example.com',path:'/admin',secure:ture})
    res.cookie('remamberme','1',{expire: new Date(Date.now() + 900000), httpOnly: true})

// 获取 cookie
    req.cookies.name

// 删除 cookie