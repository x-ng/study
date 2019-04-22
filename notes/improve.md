## 1 数组和对象方法

### 数组:

​	splice 对原数组进行操作
​	slice  返回一个新的数组
​	forEach 循环遍历数组,没有return
​	map 映射,有return
​	filter 过滤,有return
​	reduce 映射,有return
​	some 检测,返回布尔值,如果为真,跳出全部训话,如果为假,继续循环
​	every 返回值是布尔值,如果为真,跳出本次循环继续,如果为假,跳出全部循环

```
Array.from('foo')
Array ["f", "o", "o"]

Array.from([1, 2, 3], x => x + x)
Array [2, 4, 6]

```

concat 数组深拷贝
JSON.parse(JSON.stringify(state.YardsOrder))

### 对象:

Object.assign({},this.searchData);	合并对象,返回一个新对象
Object.keys({ 100: "a", 2: "b", 7: "c"}); 类似于for..in;console: ["2", "7", "100"]
Object.is()		比较两个值是否相同,返回布尔值

### 正则表达式:

​	^: 正则开始
​	[0-9]+: 匹配多个数字

[0-9]: 匹配单个数字
​	+: 匹配一个或多个
​	?: 一个字符
​	*: 多个字符
​	i: 不区分大小匹配
​	g: 全文搜索,不是第一个
​	

```
test(): 存在?
exec(): 检索字符串的指定值
toString(): 返回正则表达式的字符串

var re = new RegExp("\\w+")
var re = /\w+/
```

​	

## 2 eventloop

大概描述:

	事件队列: 宏事件(setTimeOut) 微事件(promise)
	JS的执行机制是首先判断JS是同步还是异步,同步就进入主线程,异步就进入event table,异步任务在event table中注册函数,当满足触发条件后,被推入event queue
	
	同步任务进入主线程后一直执行,直到主线程空闲时,才会去event queue中查看是否有可执行的异步任务,如果有就推入主线程中
	
	宏任务开始 -> 宏任务 -> 微任务 -> 宏任务结束 -> 循环

执行上下文
	执行环境的分类
		全局环境
		函数环境
		Eval eval内部的文本被执行的时候(不推荐使用)

	执行上下文	
		当JavaScript代码执行的时候，会进入不同的执行上下文，这些执行上下文会构成了一个执行上下文栈（Execution context stack，ECS）。栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文。
		
	全局执行栈, 函数执行栈, setime等方法
	
	其中setTimeout和Promise的任务队列叫做macro-task(宏任务)，当然如我们所想，还有micro-task(微任务)。
	
		macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
	
		micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver

        process.nextTick > setTimeout/setInterval > setImmediate

总结: 

- 不同的任务会放进不同的任务队列之中。
- 先执行macro-task，等到函数调用栈清空之后再执行所有在队列之中的micro-task。	
- 等到所有micro-task执行完之后再从macro-task中的一个任务队列开始执行，就这样一直循环。

## 3 web 优化部分

	网络
		网络部分涉及到的就是HTTP请求，因为我们访问网页的过程就是通过特定的URL来获得相应的资源（数据或文件）
		
		协议版本
		请求头中包含那些属性，有哪些意义
		请求方式之间的不同
		响应状态码的含义
		状态的管理 cookie的设置和传递。
		HTTP协议是TCP协议的一种实现，是应用层的协议，TCP协议则是传输层的协议。还可以追溯到IP协议，四层网络模型。


	资源管理
		通过之前的网络请求，我们可以获取相应的文件，那么这些文件存放在本地磁盘中。而像文件上传，cookie的存放，以及浏览器提供的数据库，都是存放在本地的，浏览器提供了一系列的API去操作这些文件。
	
		cookie的存放位置，删除机制。
		缓存的更新机制
		文件操作的API
		web数据存放的API( cookie,localstorage,sessionstroage,indexDB...)
	
	网页的浏览
		当我们获取到了一个html文件，我们开始解析，首先根据文件的<! doctype>声明去解析这个网页，构建DOM树，这是css也在下载，因为css层叠样式表,下载成功之后根据多方来源开始计算最终的css效果,然后与DOM树相结合，形成渲染树再开始绘制再浏览器界面。解析网页的时候，遇到script的时候会开始执行相应的代码，阻塞DOM树的生成。
	
		css的计算
		dom树的生成
		sript的阻塞加载
		页面的绘制
		重绘与重排
	
	性能
		通过浏览器的这几个模块，我们了解了一些知识点，但是还有其他的，比如性能。
		对于性能的优化，也可以从这几个方面去理解。性能在前端减少一个页面加载的时间。
	
		通过缓存，减少HTTP的文件传输。
		通过压缩资源，减少传输时间
		通过优秀的CSS 以及 页面结构设计 减少 浏览器渲染时间。

## 4 TS部分

	TS基础类型:
	布尔值			boolean
	数字，			number
	字符串，		string
	数组，			array			let list: number[] = [1,2,3]
	元组			Tuple			let x: [string,number] = ['name',18]; 越界时候,新定义的元素可以是任意string或number
	枚举			enum			enum Color {red,green,blue}; let c: Color = Color.green;
	任意值			any
	空值			void
	
	TS枚举:
		enum Test{
			one = 1,
			two,
			three,
			four
		}
	
		console.log(Test);
		/*{ '1': 'one',
		  '2': 'two',
		  '3': 'three',
		  '4': 'four',
		  one: 1,
		  two: 2,
		  three: 3,
		  four: 4 }
		*/
		一个枚举可以包含零个或多个枚举成员，枚举成员具有一个数字值，它可以是常数或计算得出的值。
		由上例可以看出：枚举类型被编译成了一个双向映射
		枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等
	
	TS class 类:
			class Greeter {
				greeting: string;
				constructor(message: string) {
					this.greeting = message;
				}
				greet() {
					return "Hello, " + this.greeting;
				}
			}
	
			let greeter = new Greeter("world");
	
	constructor 用来初始化数据的
	
	extend 继承父类; super() 超类;
	
	public: 公有成员
	
	private: 私有成员,不能在实例中访问
	
	protected: 类的保护成员,可以在实例中访问
	
	static: 类的静态属性,这些属性存在于类本身上面而不是类的实例上,就是不能被继承
			class Person{
				static age:number;
				static myname:string;
				tell(){
					alert('姓名：' + Person.myname);
				}
			}
			let p = new Person();
			Person.myname = 'xiaochuan';
			// Person.age = 20;
			p.tell();//'姓名：xiaochuan'
		
			myname只能用 Person 来调用;
	
		set get: 存取器,在属性面前加get是获取的时候的拦截，加set是设置的时候拦截

## 5 return、continue、break 、continue 的区别 

​	return ： 
​		  (1) return 从当前的方法中退出,返回到该调用的方法的语句处,继续执行。
​		  (2) return 返回一个值给调用该方法的语句，返回值的数据类型必须与方法的声明中的返回值的类型一致。
​		  (3) return后面也可以不带参数，不带参数就是返回空，其实主要目的就是用于想中断函数执行，返回调用函数处。
​	continue : 
​	　　终止本次循环的执行，即跳过当前这次循环中continue语句后尚未执行的语句，接着进行下一次循环条件的判断。
​	　  它不是退出一个循环，而是开始循环的一次新迭代。

		 continue语句只能用在while语句、do/while语句、for语句、或者for/in语句的循环体内，在其它地方使用都会引起错误！
	break :
		（1）break在循环体内，强行结束循环的执行，也就是结束整个循环过程，不在判断执行循环的条件是否成立，直接转向循环语句下面的语句。
		（2）当break出现在循环体中的switch语句体内时，其作用只是跳出该switch语句体。

​	
前端需要 校验重复提交


VUE 操作dom 
1.this.$refs.* 拿到虚拟DOM 可以进行真实DOM的一切操作
2.自定义指令中,el就是当前环境的DOM元素
	el.style.color = "yellow"
	

命令式渲染
	for () ...
	关注每一步
声明式渲染
	arr.foreach...
	关注结果和实现条件,不关注流程
	
	
	
事件节流和防抖

## 6 js 的闭包

函数 加 函数内部能访问到的局部变量就组成了一个闭包

闭包常常用来 简介访问一个变量 , 就是 隐藏一个变量

通常是暴露一个访问其(函数), 让别人可以 简介访问 那个变量

```
var i = 'i am in windows'

var test = function(){

     var a = 0;

      var  b = function(){ 

           console.log(a)

       }

       return b

}
```

## 7 Promise 的实现思路

```js
   var p1 = new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'hello' )
            }, 1000 )

        } )

        p1.then( res => {
                console.log( res + 'world' )
                return res + 'world'
            } )
            .then( res => {
                console.log( res + 'ziwei' )
                return res + 'ziwei'
            } )
```

- Promise 是做异步流程控制. 这个函数暂时不执行, 希望他执行的时候, 就调用一下, 这个函数就在执行一下
- 构造函数 Promise 接受一个函数. 函数的参数是 resolve, reject, resolve 和 reject 也是函数, 是给用户调用的, 当用户希望下一个异步执行时, 就调用 resolve
- 返回一个 promise 实例. promise 实例都有一个 then 方法, 而 then 方法也返回一个新的 promise 实例

## 8 设计模式

### 五大设计原则

1. 单一职责原则: 一个函数只做一件事, 如果功能过于复杂, 最好一段代码只负责一部分逻辑
2. 开放-封闭原则: 对拓展开放, 对修改封闭
3. 面向接口编程: 调用是, 只按照接口, 不必清楚接口内部的类如何实现
4. 李氏置换原则
5. 接口独立原则

### 七种常见的设计模式

1. 工厂模式
2. 单例模式
3. 适配器模式
4. 装饰器模式
5. 代理模式
6. 观察者模式
7. 迭代器模式

每个模式的学习遵循以下 3 点

- 一句话改过这个模式的思想
- 生活场景的应用 和 业务场景的应用
- js 演示该模式

#### 工厂模式

>一句话描述: 工厂模式将 new 操作符封装, 拓展一个 create 的接口开发给调用者

jq 的 $

`window.$ = function(selector){return new JQuery(selector)}`

将 JQ 的 $ 暴露给开发者, 类似于 create 方法

有了 $ 一般就不会使用 new JQuery() 来创建 jQuery 对象

好处: 

- $ 作为 create 写起来更加简单
- 做了一层拓展, 这样暴露给用户的是 $ ,内部源码可以随便修改, 而用户只需要知道暴露的是 $ 就够了

复合开放-封闭原则

```js
class Product {
    constructor (options) {
        this.name = options.name
        this.time = options.time
        this.init()
    }
    init () {
        console.log(`产品名: ${this.name} 保质期: ${this.time}`)
    }
}

class Factory {
    create (options) {
        return new Product(options)
    }
}

let factory = new Factory()
let product1 = factory.create({name: '面包',time:'一个月'})
```

#### 单例模式

> 一句话描述: 一个类只有一个实例

- 场景1: 比如 Vue 的插件机制. Vue.use()多次, 也只存在第一个插件实例
- 场景2: 比如 Vuex 的 Store 在实例化时, 就算你实例化多个, 也只能存在一个 Store , 这样才能保证共享数据
- 场景3: 创建一个购物车组件. 因为购物车往往整个项目中只有一个

比如 Vue.use 时, 我们知道 Vue 源码中回去做判断调用插件的 install 方法

但是只有 Vue.use 就直接调用了

Vue 会把 Vue.use 的东西 push 到一个数组, 每次执行 use 方法都会检查数组里是是否有这个插件了, 没有就 push , 有的话就不再执行后面的逻辑了

这样保证整个项目中, 这个插件的 install 值初始化一次, 用来避免多次初始化造成的问题

> js 实现

实现思路

- 给 SingleObject 添加一个静态方法 getInstance
- 将来实例化时, 不是通过 new , 而是通过 SingleObject.getInstance()
- getInstance 内部的实现就是, 第一次调用是用变量缓存实例. 之后调用时判断该变量是否有值, 没有值就可以 new , 有值就把这个变量 return

```js
function SingleObject () {
  this.name = '单例'
} 

SingleObject.getInstance = function () {
    if (!this.instance) {
        this.instance = new SingleObjcet()
    }
    return this.instance
}

var obj1 = SingleObject.getInstance()
var obj2 = SingleObject.getInstance()

console.log(obj1 === obj2)
```

#### 适配器模式

> 一句话描述: 接口不兼容时, 对旧接口做一层封装, 来适配新需求

- 场景 vue 的 computed 提供给函数和对象的两种写法, vue 内部需要做一层封装
- node.js 中间层

比如 vue 源码内部遍历 computed 对象后, 需要把用户传递的函数作为该计算属性的 getter 的返回值, 但是用户可能会传递 fn , 也可能传递一个带 get, set 方法的对象, 那么函数直接提供函数, 还是提供的对象, Vue 都转化为一个函数

Vue 这样的处理很多, 因为 Vue 提供给用户很宽松的写法, 可以使用 template 和 render , 但是最后 template 一定会被适配成 render 来调用

node中间层, 也算是适配器模式的引用

后端提供一些基础的数据, 但是移动端和PC端要求的数据格式是不同的, 而且是经常变化的

node 中间层可以让后端的基础数据不变化, 只是在 node 中再包装一次, 类适配业务场景

> js 实现演示

```js
// 新增的适配器
class Adaptee {
    constructor () {
        this.name = '我是适配器'
    }
    parse () {}
}

// 老代码
class OldApi {
    constructor () {
        this.name = '旧接口'
        this.adaptee = new Adaptee()
        this.adaptee.parse()
    }
}

var oldApi = new OldApi()
```

#### 装饰器模式(待完善)

> 一句话描述: 为对象装饰一些新功能, 旧的功能属性全部保留

#### 代理模式

> 一句话描述: 无法直接访问时, 通过代理来访问目标对象

- 适配器模式是在原来的基础上, 做了一层封装, 虽然没有动原来的接口, 但是最终我们是用包装好的适配后的数据, 肯定是有修改的
- 代理模式, 是通过代理, 访问原数据, 没有什么包装和修改
- 装饰器模式, 是原来的功能和函数都还要用上的基础上, 增加一些拓展功能. 而适配的话是是在包装时做一些改造

场景

- 绑定多个 li 时的事件代理
- Vue 的 data , props 被访问时, 就做了代理
- ES6 的 proxy 的代理

> js 演示

```js
class Data {
    constructor () {
        this.name = '元数据'
    }
    
    getName () {
        console.log(this.name)
    }
}

class ProxyData {
    constructor (data) {
        this.data = data
    }
    
    getName () {
        this.data.getName()
    }
}

let data = new Data()
let proxyData = new ProxyData(data)

data.getName()
proxyData.getName()
```

#### 观察者模式

> 一句话描述: 把 watcher 收集到一个队列, 等到发布时再执行通知 watcher, 来实现异步的一种模式

- 主播是发布者, 观众是订阅者
- 猎头是发布者, 候选人是订阅者
- 赛跑时, 裁判开枪发布, 所有运动员是订阅者

>业务场景

1. Vue 的收集依赖, 派发更新
2. 浏览器事件机制
3. Promise.them 的异步事件
4. Vue 的生命周期函数
5. node.js 的 eventEmitter

- 场景1: Vue 的响应式数据, 在页面渲染时, 触发 getter 收集 watcher 依赖

  订阅: Vue 的响应式数据, 在页面渲染时, 触发 getter 收集 watcher 依赖

  发布: 数据变化时, 触发 setter, Notify 所有的 watcher 调用他们的 update 方法

- 场景2: 浏览器事件机制

  订阅: btn 绑定了 click 事件, 那个 fn 就被放到事件队列中

  发布: 用户点击时, 触发 click 事件

- 场景3: Promise.then

  订阅: then 调用时, 把 then 的成功函数保存在一个变量中

  发布: 当调用 resolve 时, 状态变化, 并且把保存的 then 的成功函数调用

- 场景4: Vue 的生命周期钩子

  订阅: 在 options 上写 beforeCreate 对应的函数

  发布: 当组件初始化阶段, 到了对应时机, vue 会帮你调用用户提供的函数

> js 实现一个 eventmitter

```js
class EventEmitter {
    constructor () {
        this.eventMap = {};
    }
    on (type, fn) {
        if (!this.enentMap[type]) {
            this.enentMap[type] = []
        }
        this.eventMap[type].push(fn)
    }
    emit (type, ...params) {
        this.eventMap[type].foreach(fn => {
            fn(...params)
        })
    }
    off (type, fn) {
        let list = this.eventMap[type]
        let atIndex = list.indexOf(fn)
        if (atIndex !== -1) {
        	list.splice(atIndex,1)    
        }
    }
}
```

#### 迭代器模式(待完善)

> 一句话描述

## 9 继承

### 9.1 ES5 的继承

- 原型链继承
- 构造函数继承(对象冒充继承)
- 组合继承
- 寄生组合继承

```
let Animal = (function () {
    function Animal (name) {
        this.name = name || 'Animal'
        this.sleep = function () {
            console.log(this.name + '正在睡觉!')
        }
    }
    Animal.prototype.eat = function (food) {
        console.log(this.name + '正在吃:' + food)
    }
    return Animal
})()
```

1. 原型链继承

   ```js
   let Cat = (function () {
       function Cat () {}
       Cat.prototype = new Animal()
       Cat.prototype.name = 'cat'
       return Cat
   })()
   ```

   原型链是 JavaScript 的典型继承方式, 这种继承方式的最大特点就是共享, 所有实例共享原型对象中的所有属性的方法, 共享是它的最大优点, 也是它的最大缺点, 正对我们的不同需求, 比如大多数情况下我们常常需要某些属性是子类特有的而一些读取属性方法需要共享,

   > 另外此种继承无法向父类传参, 无法实现多继承

2. 对象冒充继承

   ```js
   let Cat = (function () {
       function Cat (name) {
           Animal.call(this, name)
       }
       return Cat
   })()
   ```

   对象冒充继承就是简单的利用 call 或者 apply 方法实现继承, 这种继承最大的特点正好与原型链继承相反不能继承原型属性/方法

   > 非共享(子类自有一份), 同样这是它的优点也是它的缺点, 另外它解决了原型链继承中无法向父类传参的缺点, 并且可以实现某种意义上的多继承 -- (注意这种多继承是打引号的)

3. 组合继承

   ```js
   let Cat = (function () {
       function Cat (name) {
           Animal.call(this, name)
       }
       Cat.prototype = new Animal()
       Cat.prototype.constructor = Cat
       return Cat
   })()
   ```

   组合继承是比较好的继承, 他是原型链继承和对象冒充继承的合体, 合理的利用了这两种组合的特点, 既是子类的实例, 也是父类的实例, 但是调用了两次父类构造函数, 生成了两份实例, 造成了内存浪费

4. 寄生组合继承

   ```js
   let Cat = (function () {
       function Cat (name) {
           Animal.call(this, name)
       }
       (function (sub,sup){
           var Super = function () {}
           Super.prototype = sup.prototype
           sub.prototype = new Super()
           sub.prototype.constructor = sub
       })(Cat, Animal)
       return Cat
   })()
   ```

### 9.2 class 的继承

#### 9.2.1 class 类的基本概念

```js
class Point {
    constructor () {
        // ...
    }
    
    toString () {
        // ...
    }
    
    toValue () {
        // ...
    }
}

等同于

Point.prototype = {
    constructor () {},
    toString () {},
    toValue () {},
}
```

在类的实例上调用方法, 其实就是调用原型的方法

```js
class B {}
let b = new B ()

b.constructor === B.prototype.constructor // true
```

##### constructor 方法

constructor 方法是类的默认方法, 通过 new 命令生成对象实例时, 自动调用该方法. 一个类必须有 constructor 方法, 如果没有显式定义, 一个空的 constructor 方法会被默认添加. 

```js
class Foo {
    constructor () {
        return Object.create(null)
    }
}

new Foo() instanceof Foo // false
```

constructor 函数返回一个全新的对象, 结果导致实例对象不是 Foo 类的实例. 

类必须使用 new 调用, 否则会报错. 这是它和普通构造函数的一个只要区别, 后者不用 new 也可以执行. 

##### 类的实例

生成类的实例的写法, 与 ES5 完全一样, 也是使用 new 命令. 

```js
class Point {
    // ...
}

// 报错
var point = Point(2, 3)

// 正确
var point = new Point(2, 3)
```

与 ES5 一样, 实例的属性除非显式定义在其本身(即定义在 this 对象中), 否则都是定义在原型上(即定义在 class 上)

```js
// 定义类
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    
    toString () {
        return '(' + this.x + ',' + this.y + ')'
    }
}

var point = new Point(2, 3)

point.toString() // (2,3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

```

与 ES5 一样, 类的所以实例共享一个原型对象. 

```js
var p1 = new Point(2, 3)
var p2 = new Point(3, 2)

p1.__proto__.printName = function () { return 'Oops'}

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4, 2)

p3.printName() // "Oops"
```

##### 取值函数(getter)和存值函数(setter)

与 ES5 一样, 在"类"的内部可以使用 get 和 set 关键字, 对某个属性设置存值函数和取值函数, 拦截改属性的存取行为

```js
class MyClass {
    constructor () {
        // ...
    }
    
    get prop () {
        return 'getter'
    }
    set prop (value) {
        console.log('setter:' + value)
    }
}

let inst = new MyClass()

inst.prop = 123 // setter: 123

inst.prop // 'getter'
```

存值函数和取值函数是设置在属性 Descriptor 对象上的

```js
class CustomHTMLElement {
    constructor (element) {
        this.element = element;
    }
    
    get html () {
        return this.element.innerHTML;
    }
    
    set html (value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(
	CustomHTMLElement.prototype, "html"
)

"get" in descriptor // true
"set" in descriptor // true
```

##### 属性表达式

类的属性名, 可以采用表达式

```js
let methodName = 'getArea'

class Square {
    constructor (length) {
        // ...
    }
    
    [methodName]() {
        // ...
    }
}
```

##### Class 表达式

与函数一样, 类也可以使用表达式的形式定义

```js
const MyClass = class Me {
    getClassName () {
        return Me.name
    }
}
```

上面代码使用表达式定义了一个类. 需要注意的是, 这个类的名字是 Me, 但是 Me 只在 Class 的内部使用, 指代当前类. 在 Class 外部, 这个类智能使用 MyClass 引用. 

```js
let inst = new MyClass()
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defind
```

Me 只在 Class 内部有定义

如果类的内部没用到的话, 可以省略 Me, 也就是可以写成下面的形式

`const MyClass = class { /* ... */ }`

采用 Class 表达式, 可以写成立即执行的 Class

```js
let person = new class {
    constructor (name) {
        this.name = name
    }
    
    sayName () {
        console.log(this.name)
    }
}('张三')

person.sayName() // '张三'
```

##### 静态方法

类相当于实例的原型, 所有在类中定义的方法, 都会被实例继承. 如果在一个方法钱, 加上 static 关键字, 就表示该方法不会被实例继承, 而是直接通过类来调用, 这就成为 "静态方法"

```js
class Foo {
    static classMethod () {
        return 'hello'
    }
}

Foo.classMethod() // 'hello'

var foo = new Foo()
foo.classMethod() // TypeError: foo.classMethod is not a function
```

上面代码中, Foo 类的 classMethod 方法前有 static 关键字, 表明该方法是一个静态方法, 可以直接在 Foo 类上调用 (Foo.classMethod()), 而不是在 Foo 类的实例上调用. 如果在实例上调用静态方法, 就会抛出一个错误, 表示不存在该方法. 

注意, 如果静态方法包含 this 关键字, 这个 this 值的是类, 而不是实例

```js
class Foo {
    static bar () {
        this.baz()
    }
    
    static baz () {
        console.log('hello')
    }
    
    baz () {
        console.log('world')
    }
    
}

Foo.bar() // hello
```

上面代码中, 静态方法 bar 调用了 this.baz , 这里的 this 指的是 Foo 类, 而不是 Foo 的实例, 等同于调用 Foo.baz. 另外, 从这个例子还可以看出, 静态方法可以与非静态方法重名.

父类的静态方法, 可被子类继承

```js
class Foo {
    static classMethod () {
        return 'hello'
    }
}

class Bar extends Foo {
    
}

Bar.classMethod() // 'hello'
```

上面代码中, 父类 Foo 有一个静态方法, 子类 Bar 可以调用这个方法.

 静态方法也可以从 super 对象上调用

```js
class Foo {
    static classMethod () {
        return 'hello'
    }
}

class Bar extends Foo {
    static classMethod () {
        return super.classMethod() + ',too'
    }
}

Bar.classMethod() // "hello, too"
```

##### 私有方法和私有属性(待完善)

#### 9.2.2 class 的继承





## 10 获取自定义属性, 特例 data-* 如何获取

官方定义: 

```js
data-* 是 html 新属性
只要勇于存储页面的自定义数据
不改包含大写字母(会默认转为小写)
```

```
<div data-a="aa" id="dic1" data-b="bb"></div>
	eg:var div1 = document.getElementById('div1')
	console.log(div1.dateset) // DOMStringMap {a : "测试", b : "222"} a : "测试" b : "222"
```

## 11 错误与异常

### try...catch

try...catch 语句作为 js 中的处理异常的一种标准方式. try 语句标记一块待尝试的语句, 如果该语句出现错误, 则通过 catch 语句进行捕获. 

```
try: {
    // 可能会导致错误的代码
} catch /捕捉块/ (error) {
    // 在错误发生时的处理
}
```

```
try {
    console.log(v) // 调用未定义变量
}
// 用于处理 try 语句中出现的错误信息
catch (error) {
    // error 表示 try 语句中出现的错误信息
    console.log('error')
}
// 终结块 catch 语句中无法处理 try 语句中的错误或异常时, 执行 finally 语句中的内容
finally {}
```

### 嵌套 try...catch 语句

可以嵌套一个或多个 try...catch 语句. 如果一个内部的 try...catch 语句没有捕捉块, 将会启动匹配外部的 try...catch 语句的捕捉块

```
try {
    console.log(0)
    } catch (error) {
        try {
            console.log(1)
        } catch (error) {
            console.log(2)
        }
    }
}
```

### 基本错误类型

执行代码期间可能会发生的错误有多中类型, 每种类型都有对应的错误类型. 当错误发生时, 就会抛出对应类型的错误对象. Error 是基本错误类型, 其他错误类型都是集成自该类型. Error 类型的错误很少见, 如果有也是浏览器抛出的. 这个基本错误类型的主要目的是提供给开发人员抛出自定义错误的.

### 预定义错误类型

js 的七种预定义的错误类型:

| 错误类型       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| EvalError      | 表示错误的原因: 与eval()有关                                 |
| InternalError  | 表示js 引擎内部错误的异常                                    |
| RangeError     | 表示错误的原因: 数值变量或参数超出其有效范围                 |
| ReferenceError | 表示错误的原因: 无效引用                                     |
| SyntaxError    | 表示错误的原因: eval() 在解析代码的过程中发生的语法错误      |
| TypeError      | 表示错误的原因: 变量或参数不属于有效类型                     |
| URIError       | 表示错误的原因: 给 encodeURL() 或 decodeURL() 传递的参数无效 |

