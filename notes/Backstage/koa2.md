# koa 原理

## Promise 的使用

> 基本的回调函数

```js
function func (num, callback) {
    setTimeout(() = > {
        try {
            let result = 1 / num
            callback(result, null)
        } catch (err) {
            callback(null, err)
        }
    }, 10)
}

funct(1, (result, err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})
```

> promise 处理的回调函数

```js
function func (num, callback) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            let result = 1 / num
            resolve(result)
        }, 1000)
    })
}

func(1).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
```

promise 处理回调函数的好处是 可以直接在方法 func 中直接处理错误.

### Promise 能力

Promise 带来的能力是 `能力管理` , 常用的方式有

`new Promise(...).then(onResolved, onRejected)`

- 任务状态管理
    resolve 成功状态, 对应 Promise.resolve
    reject 失败状态, 对应 Promise.reject
    error 异常状态, 对应 Promise.reject 或 new Promise().catch(onRejected)
- `Thenabled`机制提供的任务方法链
- new Promise().then().then().then()

### resolve

> 处理任务的成功状态

- 普通方式

```js
let p = new Promise((resolve) => {
    setTimeout(() => {
        let result = 1
        resolve(result)
    }, 1000)
})

p.then((result) => {console.log(result)})
```

- 快捷方式

```js
let p = Promise.resolve(1)

p.then((result) => {console.log(result)})
```

### reject

> 处理方式的失败状态

- 普通方式

  ```js
  let p = new Promise((resolve, reject) => {
      setTimeout(() => {
          let result = 2
          reject(result)
      }, 100)
  })
  // 有两种方式获取失败状态
  // 第一种, 通过 then 第二个函数参数处理失败状态
  p.then((result) => {
      console.log('success:',result)
  },(result) => {
      console.log('fail:', result)
  })
  // fail: 2
  
  // 第二种, 或者通过, catch 获取失败状态
  p.then((result) => {
      console.log('success:', result)
  }).catch((result) => {
      console.log('error:', result)
  })
  // error: 2
  
  // 注意: 如果两种方式同时使用的时候,只会被第一种方式处理
  p.then((result) => {
      console.log('suceess:', result)
  },(result) => {
      console.log('fail:', result)
  }).catch((result) => {
      console.log('error:', result)
  })
  // fail: 2
  ```

- 快捷方式

  ```js
  let p = Promise.reject(2)
  
  p.then(null, result => console.log('fail:', result))
  
  // huozhe
  p.then().catch(result => console.log('errror:', result))
  ```

### catch

> 如果没有设置 onRejected 处理的时候, cartch 会捕获到失败处理. 同时 catch 也会捕获到 onRejected 和 onResolved 中出现的错误

- 正常情况下直接获取到 reject 结果

  ```js
  let p = new Promise((resolve, reject) => {
      reject(3)
  })
  
  p.then((result) => {
      console.log('success:', result)
  }).catch((result) => {
      console.log('error:', result)
  })
  
  // "error: 3"
  ```

- 捕获 onResolved 中错误异常

  ```js
  let p = new Promise((resolve) => {
      resolve(3)
  })
  
  p.then((result) => {
      throw new Error('custom resolve error!')
      console.log('success', result)
  }).catch((result) => {
      console.log('custom error:', err)
  })
  
  // "custom error: Error: custom reject error!"
  ```

## async/await 使用

对于回调来说, promise 看起来是解决了回调场景中的状态处理问题, 但是 js 中`回调嵌套`还是没有处理.

- 原生嵌套

  ```js
  function increase(num, callback) {
     setTimeout(() => {
       if( !(num >= 0) ) {
         callback(new Error('The parameters must be greater than zero'), null)
       } else {
        let result = num + 1;
        callback(null, result);
       }
     }, 100)
  }
  
  increase(1, (err, result1) => {
    if(!err) {
      console.log(`result1 = ${result1}`)
  
      increase(result1, (err, result2) => {
        if(!err) {
          console.log(`result2 = ${result2}`)
  
          increase(result2, (err, result3) => {
            if(!err) {
              console.log(`result3 = ${result3}`)
            } else {
              console.log(err)
            }
          })
        } else {
          console.log(err)
        }
      })
    } else {
      console.log(err)
    }
  })
  // 运行结果
  // "result1 = 2"
  // "result1 = 3"
  // "result1 = 4"
  ```

- Promise 处理回调函数

  ```js
  function increase (num) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (!(num >= 0)) {
                  reject(new Error('The parameters must be greater than zero')
               } else {
                  let result = num + 1;
                  resolve(result)
               }
          }, 100)
      })
  }
  
  
  increase(1).then((result1) => {
      console.log（`result = ${result1}`)

      increase(result1).then((result2) => {
          console.log(`result2 = ${result2}`)

          increase(result2).then((result3) => {
              console.log(`result3 = ${result3}`)
          }).catch(err => console.log(err))

      }).catch(err => console.log(err))

  }).catch(err => console.log(err))
  
  // 运行结果
  // "result1 = 2"
  // "result2 = 3"
  // "result3 = 4"
  ```

### async/await 的使用

- async 是 `声明` 在回调环境的函数
- await 是 `运行` 在等待回调结果过程中
- Promise 是封装了回调操作的 `原子任务`

  ```js
  // 封装原子任务
  function increase(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if( !(num >= 0) ) {
        reject(new Error('The parameters must be greater than zero'))
      } else {
        resolve(num + 1)
      }
  
    }, 100);
  }).catch(err => console.log(err))
  ```

}

// 声明任务环境
async function envIncrease() {
    let num = 1;
    // 等待回调任务结果 1 返回
    let result1 = await increase(num)
    console.log(`result1 = ${result1}`)

    // 等待回调任务结果 2 返回
    let result2 = await increase(result1)
    console.log(`result2 = ${result2}`)
    
    // 等待回调任务结果 3 返回
    let result3 = await increase(result2)
    
    return result3
}

// 声明任务环境
async function env() {
    // 等待环境 increase 的结果返回
    let result = await envIncrease()
    console.log(`result = ${result}`)
}

// 运行环境
env()

// 运行结果
// "result1 = 2"
// "result1 = 3"
// "result1 = 4"



## Node.js 原生 http 模块

koa.js 是基于中间件模式的 HTTP 服务框架, 底层原理是离不开 Node.js 的 http 元素模块

### HTTP 模块的使用

```js
const http = require('http')

const PORT = 3001

const router = (req, res) => {
    res.end(`this page url = ${req.url}`)
}

const server = http.createServer(router)

server.listen(PORT, function(){
    console.log(`the server is started at port ${PORT}`)
})
```

### HTTP 服务构成

#### 服务容器

这里的服务容器, 是整个 HTTP 服务的基石, 跟 `apache` 和 `nginx` 提供的能力是一致的

- 建立了通信连接
- 指定了通信端口
- 提供了可自定内容服务容器, 也就是服务的回调函数的容器

```js
const http = require('http')

const PORT = 3001

const server = http.createServer((req, res) => {
    // TODO 容器内容
    // TODO 服务回调内容
})

server.listen(PORT, function () {
    console.log(`the server is started at port ${PORT}`)
})
```

#### 服务回调(内容)

服务回调, 可以理解成服务内容, 主要提供服务的内容

- 解析服务的请求 req
- 对请求内容作出响应 res

```js
const router = (req, res) => {
    res.end(`this page url = ${req.url}`)
}
```

#### 请求req

是服务回调中的第一个参数, 主要是提供了 HTTP 请求 request 的内容和操作内容的方法

#### 响应res

是服务回调的第二个参数, 主要是提供了 HTTP 响应 response 的内容和操作内容的方法

注意: 如果请求结束, 一定要执行响应 res.end(), 要不然请求会一直等待阻塞, 直至连接断掉页面崩溃

#### 后续

通过以上的描述, 主要 HTTP 服务内容是在 `服务回调` 中处理, 那我们来根据不同连接拆分一下, 就形成了路由 router, 根据路由内容的拆分, 就形成了控制器 `controller` .

```js
const http = require('http')

const PORT = 3001

// 控制器
const controller = {
    index(req,res) {
        res.end(`This is index page`)
    },
    home(req,res) {
        res.end(`This is home page`)
    },
    _404(req,res) {
        res.end(`404 Not Found`)
    }
}

// 路由器
const router = (req,res) => {
    if (req.url === '/') {
        controller.index(req, res)
    } else if (req.url.startsWith('/home')) {
        controller.home(req, res)
    } else {
        controller._404(req, res)
    }
}

// 服务
const server = http.createServer(router)
server.listen(PORT, function(){
    console.log(`this server is started at port ${PORT}`)
})
```

## 中间件引擎

在 Koa.js 过程中, 会发现所有中间件的使用都是这样的.

```js
const Koa = reqire('koa')
let App = new Koa();

const middleware1 = async(ctx, next) => {
    console.log(1)
    await next();
    console.log(6)
}

const middleware2 = async(ctx, next) => {
    console.log(2);
    await next()
    console.log(5)
}

const middleware3 = async(ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)
app.use(async(ctx,next) => {
    ctx.body = 'hello world'
})

app.listen(3001)

// 控制台输出
// 1
// 2
// 3
// 4
// 5
// 6
```

出现这种原因是因为 Koa.js 是一个中间件引擎 `koa-compose` 模块来实现的, 也就是 Koa.js 实现 `洋葱模型` 的核心引擎

### 中间件原理

洋葱模型可以看出, 中间件的在 `await next()` 前后的操作, 很像数据结构的"栈". 先进后出. 同时, 又有统一上下文管理操作数据.

- 有统一的`context`
- 操作先进后出
- 有控制先进后出的机制`next`
- 有提前结束机制

```js
let context = {
    data: []
}

async function middleware1 (ctx, next) {
    console.log('action 001')
    ctx.data.push(1)
    await next()
    console.log('action 006')
    ctx.data.push(6)
}

async function middleware1 (ctx, next) {
    console.log('action 001')
    ctx.data.push(2)
    await next()
    console.log('action 006')
    ctx.data.push(5)
}

async function middleware1 (ctx, next) {
    console.log('action 001')
    ctx.data.push(3)
    await next()
    console.log('action 006')
    ctx.data.push(4)
}

Promise.resolve(middleware1(context, async() => {
    return Promise.resolve(middleware2(context, async() => {
        return Promise.resolve(middleware2(context, async() => {
            return Promise.resolve()
        }))
    }))
}))
    .then(() => {
        console.log('end')
        console.log('context = ', context)
  
  })

// 结果显示
// "action 001"
// "action 002"
// "action 003"
// "action 004"
// "action 005"
// "action 006"
// "end"
// "context = {data: [1,2,3,4,5,6]}"

```

### 引擎实现

单纯使用 **Promise** 嵌套可以直接实现中间件流程. 虽然可以实现, 但是 **Promise** 嵌套会产生代码可读性和可维护性的问题, 可带来了中间件扩展问题.

所以需要把 **Promise** 嵌套实现的中间件方式进行高度抽象, 达到可以自定义中间件的层数. 这时候需要借助 async/await

- 中间件队列
- 处理中间件队列, 并将上下文 context 传进去
- 中间件的流程控制器 next
- 异常处理

根据分析中间件的原理, 可以得出

- 每一个中间件需要封装一个 promise
- 洋葱模型的先进后出操作, 对应 promise.resolve 的前后操作

```js
function compose (middleware) {
    if (!Array.isArray (middleware)) {
        throw new TypeError ('Middleware stack must be an array!')
    }

    return function (ctx, next) {
        let index = -1;

        return dispatch(0);

        function dispatch (i) {
            if (i < index) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            index = i;

            let fn = middleware[i]

            if (i === middleware.length) {
                fn = next
            }

            if (!fn) {
                return Promise.resolve()
            }

            try {
                return Promise.resolve(fn(ctx, () => {
                    return dispatch(i + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

```

使用中间件引擎

```js
let middleware = []
let context = {
    data: []
}

middleware.push(async(ctx, next) => {
    console.log('action 001')
    ctx.data.push(2)
    await next()
    console.log('action 006')
    ctx.data.push(5)
})

middleware.push(async(ctx, next) => {
    console.log('action 001')
    ctx.data.push(2)
    await next()
    console.log('action 006')
    ctx.data.push(5)
})

middleware.push(async(ctx, next) => {
    console.log('action 003')
    ctx.data.push(2)
    await next()
    console.log('action 004')
    ctx.data.push(5)
})

const fn = compose(middleware)

fn(context).then(() => {
    console.log('end')
    console.log('context = ', context)
})

// 结果显示
// "action 001"
// "action 002"
// "action 003"
// "action 004"
// "action 005"
// "action 006"
// "end"
// "context = {data: [1,2,3,4,5,6]}"

```

## 普通中间件HTTP服务实现

### 必要条件

- 内置中间件队列
- 中间件遍历机制
- 异常处理机制

### 最简实现

- demo源码
- 服务类封装

```js
const http = require('http')
const Emitter = require('events')

class WebServer extends Emitter {
    constructor () {
        super()
        this.middelware = []
        this.context = Object.create({})
    }
    // 服务事件监听
    listen (...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }

    // 注册使用中间件
    use (fn) {
        if (typeof fn === 'function') {
            this.middleware.push(fn)
        }
    }

    // 中间件总回调方法
    callback () {
        let that = this

        if (this.listeners('error').length === 0) {
            this.on('error', this.onerror)
        }

        const handleRequest = (req, res) => {
            let context = that.createContext(req, res)
            this.middleware.forEach((cd, idx) => {
                try {
                    cb(context)
                } catch (err) {
                    that.onerror(err)
                }

                if (idx + 1 >= this.middleware.length) {
                    if (res && typeof res.end === 'function') {
                        res.end()
                    }
                }
            })
        }
        return handleRequest
    }

    // 异常处理监听
    onerror (err) {
        console.log(err)
    }

    // 创建通用上下文
    createContext (req, res) {
        let context = Object.create(this.context)
        context.req = req
        context.res = res
        return context;
    }

}

module.exports = WebServer;

```

- 服务使用

```js
const WebServer = require('./index')

const app = new WebServer()
const PORT = 3001

app.use(ctx => {
    ctx.res.write('<p>line 1</p>')
})

app.use(ctx => {
    ctx.res.write('<p>line 2</p>')
})

app.use(ctx => {
    ctx.res.write('<p>line 3</p>')
})

app.listen(PORT, () => {
    console.log(`the web server is starting at port ${PORT}`)
})
```

## 最简 Koa.js 实现

最简单的中间件世 HTTP 服务的底层是基于回调嵌套去处理中间件队列

```js
// 中间件总回调方法
callback () {
    let that = this

    if (this.listeners('error').length === 0) {
        this.on('error', this.onerror)
    }

    const handleRequest = (req, res) => {
         let context = that.createContext(req,res)
         this.middleware.forEach((cb, idx) => {
             try {
                 cb(context)
             } catch (err) {
                 that.onerror(err)
             }
         }

         if (idx + 1 >= this.middleware.length) {
             if (res && typeof res.end === 'function') {
                 res.end()
             }
         }
         )}
        return handleRequest;
}

```

使用中间件越多, 回调嵌套越深, 代码的可读性和可扩展性就很差, 所以转化为 Promise + async/await 就会很简单

### 必要的条件

- 通过上下文赋值可替代 res.end()
- 洋葱模型的中间件机制

### 源码实现

- 最简 Koa.js 实现

```js
const http = require('http')
const Emitter = require('events')
// 使用之前的中间件引擎源码
const compose = require('./../compose')

// 通用上下文
const context = {
    _body: null,

    get body () {
        return this._body
    }

    set body (val) {
        this._body = val
        this.res.end(this._body)
    }
}

class SimpleKoa extends Emitter {
    constructor () {
        super()
        this.middleware = []
        this.context = Object.create(context)
    }

    // 服务事件监听
    listen (...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }

    // 注册使用中间件
    use (fn) {
        if (typeof fn === 'function') {
            this.middleware.push(fn)
        }
    }

    // 中间件总回调方法
    callback () {
        if (this.listener('error').length = 0) {
            this.on('error', this.onerror)
        }

        const handleRequest = (req, res) => {
            let context = this.createContext(req, res)
            let middleware = this.middleware

            // 执行中间件
            compose(middleware)(context).catch(err => this.onerror(err))
        }

        return handleRequest;
    }

    // 异常处理机制
    onerror (err) {
        console.log(err)
    }

    // 创建通用上下文
    createContext (req, res) {
        let context = Onject.create(this.context)
        context.req = req
        context.res = res
        return context
    }
}

module.exports = SimpleKoa

```

- 执行例子

```js
const SimpleKoa = require('./index')

const app = new Simple()
const PORT = 3001

app.use(async ctx => {
    ctx.body = '<p>this is a body</p>'
})

app.listen(PORT, () => {
    console.log(`this web server is starting at port ${PORT}`)
})



```

# Koa.js 的 AOP 设计

## AOP 面向切面编程

### 什么是 AOP

AOP 就是面向切面编程

- 水果的包装线一开始只有, 采摘-清洗-贴标签
- 如果要加上两道工序, 分类和包装, 但不能干扰原有流程, 同时如果没有增加收益可以随时撤销
- 最后在空隙插上两个人去处理, 形成 采摘-分类-清洗-包装-贴标签 的新流程, 而且人随时都可以走

回到 AOP ,就是现有代码程序中, 在程序生命周期或者横向流程中 加入/减去 一个过多个功能, 不影响现有功能

### Koa.js 的切面

- 切面有中间件机制实现
- 一个中间件一般有两个切面
- 遵循先进后出的切面执行顺序

## 洋葱模型切面

Koa.js 是基于 洋葱模型 的 HTTP 中间件处理流程

洋葱模型可以拆解成以下几个元素

- 生命周期
- 中间件
- 中间件在生命周期中
  - 前置操作
  - 等待其他中间件操作
  - 后置操作

### 中间件处理流程

- 举个例子

```js
let context = {
    data: []
}

async function middleware (ctx, next) {
    console.log('action 001)
    ctx.data.push(1)
    await next()
    console.log('action 002')
    ctx.data.push(6)
}

async function middleware (ctx, next) {
    console.log('action 002)
    ctx.data.push(2)
    await next()
    console.log('action 005')
    ctx.data.push(5)
}

async function middleware (ctx, next) {
    console.log('action 003)
    ctx.data.push(3)
    await next()
    console.log('action 004')
    ctx.data.push(4)
}

Promise.resolve(middleware(context, async() => {
    return Promise.resolve(middleware2(context, async() => {
        return Promise.resolve(middleware3(context, async() => {
            return Promise.resolve()
        }))
    }))
}))
.then(() => {
    console.log('end')
    console.log('context = ', context)
})

// 结果显示
// "action 001"
// "action 002"
// "action 003"
// "action 004"
// "action 005"
// "action 006"
// "end"
// "context = {data: [1,2,3,4,5,6]}"
```

- 源码元素解析
  - 生命周期就是 Promise.resolve 的嵌套
  - 中间件就是 middleware1, middleware2, middleware3
  - 中间件在生命周期中, 及时 Promise.resolve(middleware) 嵌套中执行中间件
    - middleware1 前置操作 action 001
    - 等待嵌套的 middleware2
      - middleware2 的前置操作 action 002
      - 等待嵌套的 middleware3
        - middleware3 前置操作 action 003
        - middleware3 后置操作 action 004
      - middleware2 后置操作 action 005
  - middleware1 后置操作 action 006

## HTTP 切面流程

### 任人打扮的 HTTP

- 从 HTTP 请求从拿到想要的数据
- 从拿到数据处理想要处理的事情
- 给处理后的结果

### HTTP 生命周期

- HTTP请求
  - 路由操作
  - 权限操作
  - 数据安全
- 业务操作
  - 数据操作
  - 树杈查询
- http 响应
  - 响应操作

                    路由过滤  权限拦截  数据安全                   日志统计  统一登录态

        http.req --> --> --> --> --> --> --> --> --> service --> --> --> --> --> --> http.res

### Koa.js 的 HTTP 旅程

- 请求
- 中间件
- 响应

                            headers             中间件执行两次           body
                            cookie                 先进后出              type
                            query                                      status
                            origin                                      length
                            ...                                          ...

        node.http.req -->  ctx.request --> --> middleware --> --> --> ctx.response  --> --> -->ctx.response

# Koa.js 中间件

## 中间件分类

市面上的大部分 Web 框架, 都提供了很多 Web 相关的能力支撑, 例如:

- HTTP 服务
- 路由管理
- 模块渲染
- 日志
- 插件/中间件等AOP能力
- 其他能力

Koa.js 作为一个 web 框架, 总结提供两种能力

- HTTP 服务
- 中间件机制 (AOP切面)

综上所述, 用 Koa 想实现大部分 web 功能的话, 就需要整合相关功能的中间件

### 狭义中间件描述

狭义中间件的特点:

- 中间件内操作请求 request
- 中间件内操作响应 response
- 中间件内操作上下文 context
- 大多数直接被 app.use() 加载

举个例子, 例如中间件 koa-static 主要是靠拦截请求和响应, 加载静态资源, 中间件 koa-bodyparser 主要是拦截请求后解析出 http 请求体中的post数据, 再挂载到ctx上

### 广义中间件描述

广义中间件的特点:

- 不直接提供中间件
- 通过间接方式提供了中间件或者子中间件
- 间接被 app.use() 加载
- 其他方式接入 koa 切面

举个例子, 中间 koa-router 是先注册后形成多个 子中间件, 后面再封装成一个 父中间件 提供给 app.use() 加载, 让所有子中间件加载到 koa.js的请求 洋葱模型中

## 狭义中间件

常见要素:

- 一切皆中间件
- 中间件内操作请求 request
  - 请求拦截
- 中间件内操作响应 response
  - 响应拦截
- 中间件内操作上下文 context
  - 直接上下文代理, 初始化实例时候挂载代理在 app.context 上
  - 请求过程上下文处理, 请求时候挂载在 ctx 上
- 大部分直接被 app.use() 加载
  - 注意: 初始化实例挂载代理 context 不被 app.use()

### 请求拦截

```js
const Koa = require('koa')
let app = new Koa()

const middleware = async function(ctx, next) {
    // 中间件 拦截请求
    // 把所有请求不是 /page/ 开头的路径全部抛出 500
    const reqPath = ctx.request.path
    if (reqPath.indexOf('/page') !== 0) {
        ctx.throw(500)
    }
    await next()
}

const page = async function(ctx, next) {
    ctx.body = `
      <html>
        <head></head>
        <body>
          <h1>${ctx.request.path}</h1>
        </body>
      </html>
    `
}

app.use(middleware)
app.use(page)

app.listen(3001, function () {
    console.log("the demo is start at port 3001")
})

```

### 响应拦截

```js
const Koa = require('koa')
let app = new Koa()

const middleware = async function(ctx, next) {
    ctx.response.type = 'text/plain'
    await next()
}

const page = async function (ctx, next) {
    ctx.body = `
      <html>
        <head></head>
        <body>
          <h1>${ctx.path}</h1>
        </body>
      </html>
    `
}

app.use(middleware)
app.use(page)

app.listen(3001, function () {
    console.log('the demo is start at port 3001')
})

```

### context 挂载代理

- 请求代理注入
  - 直接被app.use
  - 请求时候才有注入
  - 每次请求的注入都不同
- 初始化实例(应用)代理注入
  - 直接注入到 app.context
  - 初始化应用的时候才注入
  - 只注入一次, 每次请求都可以使用

### 请求时挂载代理context

```js
const Koa = require('koa')
let app = new Koa()

const middleware = async function (ctx, next) {
    // 中间件 代理/挂载上下文
    // 把所有当前服务的进程PID, 内存使用情况方法代理/挂载到ctx 上
    ctx.getServerInfo = functin () {
        function parseMem (mem = 0) {
            let mamVal = mem / 1024 / 1024
            memVal = memVal.toFixed(2) + 'MB'
            return memVal
        }

        function getMemInfo () {
            let memUsage = process.memoryUsage()
            let rss = parseMem(memUsage.rss)
            let heapTotal = parseMem(memUsage.heapTotal)
            let heapUsed = parseMem(memUsage.heapUsed)
            return {
                pid: process.pid,
                rss,
                heapTotal,
                heapUsed
            }
        }

        return getMemInfo()
    }

    await next()
}

const page = async function (ctx, next) {
    const serverInfo = ctx.getServerInfo()
    ctx.body = `
        <html>
            <head></head>
            <body>
            <p>${JSON.stringify(serverInfo)}</p>
            </body>
        </html>
    `
}

app.use(middleware)
app.use(page)

app.listen(3001, function(){
    console.log('the demo is start at port 3001')
})

```

### 初始化实例挂载代理 context

```js
const Koa = require('koa')
let app = new Koa()

const middleware = function (app) {
    // 中间件在初始化实例 把getServerInfo方法 挂载代理到上下文
    app.context.getServerInfo = function () {
        function parseMem (mem = 0) {
            let memVal = mem / 1024 / 1024
            memVal = memVal.toFixed(2) + 'MB'
            return memVal
        }

        function getMemInfo () {
            let memUsage = process.memoryUsage()
            let rss = parseMem(memUsage.rss)
            let heapTotal = parseMem(memUsage.heapTotal)
            let heapUsed = parseMem(memUsage.heapUsed)
            return {
                pid: process.pid,
                rss,
                heapTotal,
                heapUsed
            }
        }
        return getMemInfo()
    }
}

middleware(app)

const page = async function (ctx, next) {
    const serverInfo = ctx.getServerInfo()
    ctx.body = `
    <html>
        <head></head>
        <body>
            <p>${JSON.stringify(serverInfo)}</p>
        </body>
    </html>
    `
}

app.use(page)

app.listen(3001, function () {
    console.log('the demo is start at port 3001')
})

```

## 广义中间件

### 前言

- 不直接提供中间件
- 通过间接方式提供了中间件, 最常见的是 间接中间件 和 子中间件
- 间接被 app.use() 加载
- 其他方式接入 Koa 切面

### 间接中间件

```js
const Koa = require('koa')
let app = new Koa()

function indirectMiddleware (path, middleware) {
    return async function (ctx, next) {
        console.log(ctx.path === path, middleware)
        if (ctx.path === path) {
            await middleware(ctx, next)
        } else {
            await next()
        }
    }
}

const index = async function (ctx, next) {
    ctx.body = 'this is index page'
}

const hello = async function (ctx, next) {
    ctx.body = 'this is hello page'
}

const world = async function (ctx, next) {
    ctx.body = 'this is world page'
}

app.use(indirectMiddleware('/', index))
app.use(indirectMiddleware('/hello', index))
app.use(indirectMiddleware('/world', index))

app.listen(3001, () => {
    console.log('the demo is start at port 3001')
})

```

### 子中间件

子中间件是广义中间件的一个最优代表场景, 主要的特点是

- 初始化中间件时, 内置子中间件列表
- 子中间件列表添加子中间件列表
- 子中间件列表封装成间接中间件, 让后被 app.use() 加载

```js
const Koa = require('koa')
let app = new Koa()

class Middleware {
    constructor () {
        this.stack = []
    }

    get (path, childMiddleware) {
        this.stack.push({path, middleware: childMiddleware})
    }

    middlewares () {
        let stack = this.stack
        return async function (ctx, next) {
            let path = ctx.path;
            for (let i = 0; i < stack.length; i++) {
                const child = stack[i]
                if (child && child.path === path && child.middleware) {
                    await child.middleware(ctx, next)
                }
            }
            await next()
        }
    }
}

const middleware = new Middleware()
middleware.get('/page/001', async(ctx, next) => {ctx.body = 'page 001'})
middleware.get('/page/002', async(ctx, next) => {ctx.body = 'page 002'})
middleware.get('/page/003', async(ctx, next) => {ctx.body = 'page 003'})

app.use(middleware,middlewares())

app.listen(3001, function () {
    console.log('the demo is start at port 3001')
})

```

# 狭义中间件-请求/响应拦截

## koa-logger 实现

### 前言

狭义中间件, 请求/拦截 最显著的特征是

- 直接被 app.use()
- 拦截请求
- 操作响应

最简单的场景是 Koa.js 官方支持传输静态文件中间件的实现 koa-logger

> 本节主要以官方的 koa-logger 中间件为参考, 实现了一个最简单的 koa-logger 实现, 方便原理讲解和后溪二次自定义优化开发.

### 实现步骤

- step 01 拦截请求, 打印请求 URL
- step 02 操作响应, 打印响应 URL

### 实现源码

    https://github.com/chenshenhai/koajs-design-note/tree/master/demo/chapter-04-01

```js
// 安装依赖
npm i
// 执行 demo
npm run start

// 最后启动 chrome 浏览器访问
// http://127.0.0.1:3000/hello
// http://127.0.0.1:3000/world

```

### 解读

```js
const logger = async function (ctx, body) {
    let res = ctx.res

    // 拦截操作请求 request
    console.log(`<-- ${ctx.method} ${ctx.url}`)

    await next()

    // 拦截操作响应 request
    res.on('finish', () => {
        console.log(`--> ${ctx.method} ${ctx.url}`)
    })
}

module.exports = logger
```

### 使用

```js
const Koa = require('koa')
const logger = require('./index')
const app = new Koa()

app.use(logger)

app.use(async(ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('[demo] is starting at port 3000')
})
```

## koa-send 实现

### 前言

狭义中间件, 请求/拦截, 最显著的特征是

- 直接被 app.use()
- 拦截请求
- 操作响应

最典型的场景是 Koa.js 官方支持传输静态文件中间件的实现 koa-send

主要实现场景流程是

- 拦截请求, 判断该请求是否请求本地静态资源文件
- 操作响应, 判断返回的静态文件文本内容或出错提示

### 实现步骤

- step 01 配置静资源绝对目录地址
- step 02 判断是否支持隐藏文件
- step 03 获取文件或者目录信息
- step 04 判断是否需要压缩
- step 05 设置HTTP头信息
- step 06 静态文件读取

### 源码解读

```js
const fs = require('fs');
const path = require('path');
const {
  basename,
  extname
} = path;

const defaultOpts = {
  root: '',
  maxage: 0,
  immutable: false,
  extensions: false,
  hidden: false,
  brotli: false,
  gzip: false,
  setHeaders: () => {}
};

async function send(ctx, urlPath, opts = defaultOpts) {
  const { root, hidden, immutable, maxage, brotli, gzip, setHeaders } = opts;
  let filePath = urlPath;

  // step 01: normalize path
  // 配置静态资源绝对目录地址
  try {
    filePath = decodeURIComponent(filePath);
    // check legal path
    if (/[\.]{2,}/ig.test(filePath)) {
      ctx.throw(403, 'Forbidden');
    }
  } catch (err) {
    ctx.throw(400, 'failed to decode');
  }

  filePath = path.join(root, urlPath);
  const fileBasename = basename(filePath);

  // step 02: check hidden file support
  // 判断是否支持隐藏文件
  if (hidden !== true && fileBasename.startsWith('.')) {
    ctx.throw(404, '404 Not Found');
    return;
  }

  // step 03: stat
  // 获取文件或者目录信息
  let stats; 
  try { 
    stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      ctx.throw(404, '404 Not Found');
    }
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR']
    if (notfound.includes(err.code)) {
      ctx.throw(404, '404 Not Found');
      return;
    }
    err.status = 500
    throw err
  }

  let encodingExt = '';
  // step 04 check zip
  // 判断是否需要压缩
  if (ctx.acceptsEncodings('br', 'identity') === 'br' && brotli && (fs.existsSync(filePath + '.br'))) {
    filePath = filePath + '.br';
    ctx.set('Content-Encoding', 'br');
    ctx.res.removeHeader('Content-Length');
    encodingExt = '.br';
  } else if (ctx.acceptsEncodings('gzip', 'identity') === 'gzip' && gzip && (fs.existsSync(filePath + '.gz'))) {
    filePath = filePath + '.gz';
    ctx.set('Content-Encoding', 'gzip');
    ctx.res.removeHeader('Content-Length');
    encodingExt = '.gz';
  }

  // step 05 setHeaders
  // 设置HTTP头信息
  if (typeof setHeaders === 'function') {
    setHeaders(ctx.res, filePath, stats);
  }

  ctx.set('Content-Length', stats.size);
  if (!ctx.response.get('Last-Modified')) {
    ctx.set('Last-Modified', stats.mtime.toUTCString());
  }
  if (!ctx.response.get('Cache-Control')) {
    const directives = ['max-age=' + (maxage / 1000 | 0)];
    if (immutable) {
      directives.push('immutable');
    }
    ctx.set('Cache-Control', directives.join(','));
  }

  const ctxType = encodingExt !== '' ? extname(basename(filePath, encodingExt)) : extname(filePath);
  ctx.type = ctxType;

  // step 06 stream
  // 静态文件读取
  ctx.body = fs.createReadStream(filePath);
}

module.exports = send;


```

### koa-send 使用

```js
const send = require('./index')
const Koa = require('koa')
const app = new Koa()

// public/ 为当前项目静态文件目录
app.use(async ctx => {
    await send(ctx, ctx.path, {root: `${__dirname}/public`})
})

app.listen(3000)

console.log('listening on port 3000')


```

