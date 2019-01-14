// 1.安装express
	// npm i express --save

// 2.简单实用
// 	npm i express -save
	
	// // 引入
	// var express = require('express');
	// var app = express();
	
	// // 配置路由
	// app.get('/', (req,res) => {
	// 	res.send('hello world')
	// });

	// // 监听端口
	// app.listen(3000, '127.0.0.1');

// 3. 完整demo
	var express = require('express');
	var app = new express();

	app.get('/', (req,res) => {
		res.send('首页');
	})

	app.get('/search', (req,res) => {
		res.send('搜索');
	})

	app.get('/login', (req,res) => {
		res.send('登录');
	})

	app.get('/register',(req,res) => {
		res.send('注册')
	})

	app.listen(3000,'127.0.0.1')

// 4.express中的路由
// 路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等） 组成的，涉及到应用如何响应客户端对某个网站节点的访问
	app.get('网址',(req,res) => {
		
	})
	app.post('网址',(req,res) => {
		
	})
	app.put('/user',(req,res) => {
		
	})
	app.delete('/user',(req,res) => {
		
	})

	// 动态路由配置
	app.get('/user/:id',(req,res) => {
		var id = req.params["id"];
		res.send(id);
	})

	// 路由的正则匹配
	app.get('/ab*cd',(req,res) => {
		res.send('ab*cd');
	})

	// 路由get里获取值
	// /news?id=2&sex=man
	app.get('/news',(req,res) => {
		console.log(req.query);
	})

// 5.express框架中的ejs的安装
	// npm i ejs --save

	var express = require('express')
	var app = express()
	
	app.set("view engine","ejs")

	app.get("/",(req,res) => {
		res.render("news",{
			"news":["111","22"]
		})
	})

	app.listen(3000);

// 6.托管静态文件
	app.use(express.static('public'))
