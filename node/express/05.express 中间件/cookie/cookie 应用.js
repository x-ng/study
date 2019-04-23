var express = require("express")
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser())

app.get("/",(req,res) => {
    res.send('浏览历史')
})

app.get('/lvyou',(req,res) => {
    var city = req.query.city; // 当前城市

    var citys = req.cookies.citys // 数组

    if (citys) {
        citys.push(city)
    } else {
        citys = []; // 没值的时候,改为数组
    }



    res.cookie('citys',city,{maxAge:900000})

    res.send('你浏览的城市是' + city)
    
})

app.listen(3001)