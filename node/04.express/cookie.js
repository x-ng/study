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
//     domain: 域名     
//     name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字 一样     
//     Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday,
// 09-Nov-99 23:12:40 GMT     
//     maxAge： 最大失效时间（毫秒），设置在多少后失效     
//     secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效     
//     Path： 表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie    httpOnly：是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性，则通过程序（JS 脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击产生 
//     singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值 

// 获取 cookie
    req.cookies.name

// 删除 cookie
    res.cookie("remeberme","",{expires: new Date(0)})
    res.cookie('username','zhangsan',{domin:'.ccc.com',maxAge:0,httpOnly:true})

// 加密 cookie
    // 配置中间件的时候传参
    var cookieParser = require('cookie-parser')
    app.use(cookieParser('123456'))
    // 设置 cookie 的时候配置 signed 属性
    res.cookie('userinfo','ahhahaah',{domin:'.ccc.com',maxAge:900000,httpOnly:true,signed:true})
    // signedCookies 调用设置的 cookie
    console.log(req.signedCookies);