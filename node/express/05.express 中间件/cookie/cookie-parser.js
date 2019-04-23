// 同一个浏览器,用一个域名
// 安装
    // npm i cookie-parser --save
// 引入 
    var cookieParser = require('cookie-parser')
// 配置
    app.use(cookieParser)
// 设置中间件 
    app.use(cookieParser())
// 设置 
// 参数1:名字
// 参数2:cookie的值
// 参数3:cookie的设置
    // cookie res.cookie("name","zhangsna",{maxAge:900000,httpOnly:true})
// 获取 
    // cookie req.cookies.name

// 多个二级域名共享cookie
res.cookie('name','zhangsan',{maxAge:90000,domain:'.aaa.com'})
res.cookie('name','zhangsan',{maxAge:90000,path:'/news'})


//     domain: 域名     
//     name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字 一样     
//     Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday,
// 09-Nov-99 23:12:40 GMT     
//     maxAge： 最大失效时间（毫秒），设置在多少后失效     
//     secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效     
//     Path： 表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie    httpOnly：是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性，则通过程序（JS 脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击产生 
//     singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值 


// 让用户看不到 cookie 明文信息
    // 1.保存的时候加密
    // 2.cookie-parser里面的加密模块 signed
        app.use(cookieParser('sign')); // 参数表示加密的字符串
        res.cookie('useinfo','cookie',{maxAge:60000,signed:true}) // 设置
        req.signedCookies;  // 获取加密的 cookie 信息
