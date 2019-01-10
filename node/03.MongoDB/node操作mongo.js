
// // nodejs 操作 mongodb 数据库
// // 安装
//     // cnpm i mongodb --save
// // 引入
//     var MongoClient = require('mongodb').MongoClient;
// // 定义数据库的地址 以及配置数据库
//     var url = 'mongodb://localhost:27017';
//     var dbname = 'shop'
// // nodejs连接数据库
//     MongoClient.connect(url,(err,client) => {
//         const db = client.db(dbname);  // 数据库db对象
//     })
// // 操作数据库
//     MongoClient.connect(url,(err, client) => {
//         const db = client.db(dbname)
//         MongoClient.connect(url,(err,db) => {
//             db.collection('user').insertOne({"name":"张三"},(err,result) => {
//                 db.close() // 关闭连接
//             })
//         })
//     })
 

// var MongoClient = require('mongodb').MongoClient;

// // 定义连接数据库的地址
// const url = 'mongodb://localhost:27017/';
// var dbname = 'shop'

// // 连接数据库
// MongoClient.connect(url,(err,client) => {
//     if (err) {
//         console.log('数据连接失败');
//         return false;
//     }
//     let db = client.db(dbname); // 获取db对象

//     db.collection("admin").insertOne({"name":"mongodb3.0","age":10},(err) => {
//         if (err) {
//             console.log('添加失败');
//             return false;
//         }
//         console.log('添加成功');
//         client.close();  // 关闭数据库
//     })
// })



// 引入包
    // npm i mongodb --save-dev

// node 连接 mongodb 数据库
    var express = require('express')
    // 数据库引用
    var MongoClient = require('mongodb').MongoClient;
    var app = express();

    // 数据库连接的地址, 最后/表示数据库的名字
    var shujukuURL = 'mongodb://localhost:27017/news'

    app.get("/",(req,res) => {
        MongoClient.connect(shujukuURL,(err,db) => {
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
            if (err) {
                res.send('数据库连接失败')
                return;
            }
            res.write('数据库连接成功 \n')
            db.collection("user").insertOne({"name":"哈哈"},(err,result) => {
                if (err) {
                    res.send('数据库写入失败')
                    return;
                }
                res.write("数据插入成功")
                res.end();
                db.close()
            })
            res.end();
            // 关闭
            db.close();
        })
    })
    
    app.listen(8020);

// nodejs 查找 mongodb 数据库集合
    MongoClient.connect(dbUrl,(err,db) => {
        if (err) { // 数据库练级失败
            console.log("数据库连接失败");
            return;
        }

        var result = [];

        var userRel = db.collection('user').find()

        userRel.each((err,doc) => {
            if (err) {
                res.write('游标遍历错误')
                return;
            }
            if (doc != null) {
                result.push(doc)
                
            } else {
                console.log(result);
                // 遍历完成
                db.close()
                res.render("index",{
                    "result": result
                })
            }
            
        })
        
    })

// nodejs 给 mongodb 添加数据
    MongoClient.connect(dbUrl,(err,db) => {
        if (err) {
            return
        }

        db.collection("user").insertOne({
            "name":name,
            "age":age,
            "score":{
                "shuxue":shuxuechegnji,
                "yuwen": yuwenchegnji
            }
        },(err,result) => {
            if (err) {
                console.log("写入数据失败");
            }
            // 关闭数据
            db.close();
            res.redirect('/'); // 路由跳转
            res.end();
            
        })
        
    })

// nodejs 修改 mongodb 数据
    MongoClient.connect(dbUrl,(err,db) => {
        if (err) {
            console.log("数据库连接错误");
            return;
            
        }

        db.collection('user').updateOne({"_id":ObjectID(id)},{
            "name":name,
            "age":age,
            "score":{
                "shuxue": shuxue,             
                "yuwen": yuwen 
            }
        }, (err,results) => {
            console.log(results);
            db.close();

            res.redirect('/');
            res.end('end')
            
        })
        
    })

// nodejs 删除 mongodb 数据
    MongoClient.connect(dbUrl,(err,db) => {
        if (err) {
            throw new Error('数据库连接失败')
            return;
            
        }
        db.collection("user").deleteOne({"_id":ObjectID(id)},(error,result) => {
            if (error) {
                throw new Error("删除数据失败")
                return;
                
            }
            db.close();
            res.redirect("/")
            
        })
        
    })