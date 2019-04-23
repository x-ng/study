// express 中间件
	// 种类:
	// 应用级中间件
	// 路由级中间件
	// 错误处理中间件
	// 内置中间件
	// 第三方中间件

	应用级中间件
		// 匹配所有的路由
		app.use((req,res,next) => {
			console.log(new Date());
			next(); // 继续向下执行
		})

		app.get('/',(req,res) => {
			res.send('根')
		})

		app.get('/index',(req,res) => {
			res.send('首页')
		})

	路由中间件
		app.get('/',(req,res,next) => {
			console.log('1');
			next();
		})

		app.get('/',(req,res) => {
			console.log('2');
		})
	
	错误处理中间件
		app.get('index',(req,res) => {
			res.send('shouye')
		});

		// 404
		app.use((req,res) => {
			res.status(404).render('404',{})
		})

    内置中间件
        // 托管静态页面
        // 虚拟目录
		app.use('/static',express.static("./static"))
		app.use('/news',express.static('./static'))

	第三方中间件
		// body-parser 中间件 获取post提交的数据
		// cnpm i body-parser --save
		var bodyParser = require('body-parser')
		设置中间件
		// 处理form表单的中间件
		// parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({extended: false}));
		// parse application/json
		app.use(bodyParser.json());
	
// 8.获取get post请求的参数
	// get 请求的参数在URL中,在原生node中,需要使用url模块来表示参数字符串. 在express中,不需要使用url模块,可以直接使用req.query对象;
	// post 请求在express中不能直接获得,可以使用body-parser模块,使用后,将可以使用req.body得到参数.但是表单如果有文件上传,那么还是需要formidable模块

	// 安装
	// npm i body-parser

	// 使用 req.body 获取的post过来的参数
	var express = require('express')
	var bodyParser = require('body-parser')

	var app = express()

	// json还是xml
	app.use(bodyParser.urlencoded({extended:false}))
	app.use(bodyParser.json())

	app.use((req,res) => {
		res.setHeader('Content-Type','text/plain')
		res.write('you posted:/n')
		res.send(JSON.stringify(req.body,null,2))
    })
    


