var express = require('express')

var app = new express()

// 使用ejs 默认找views这个页面
app.set('view engine','ejs')

// 配置public为静态目录
app.use(express.static('public'))

app.get('/',(req,res) => {
    // res.send('index')
    res.render('login')
    
})
app.get('/login',(req,res) => {
    // res.send('login')
    res.renser('login')
    
})
app.get('/product',(req,res) => {
    // res.send('product')
    res.renser('product')
    
})
app.get('/productadd',(req,res) => {
    res.render('product')
    
})
app.get('/productedit',(req,res) => {
    res.render('productedit')
    
})
app.get('/productdelete',(req,res) => {
    res.render('productdelete')
    
})

app.listen(3003,"127.0.0.1")