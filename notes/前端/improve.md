## 1 数组和对象方法

### 数组:

​splice 对原数组进行操作

​slice  返回一个新的数组

​join 将数组各项连接起来

---

es6新的数组方法

1. Array.of() 无论多少参数，无论多少类型，创建一个包含所有参数的数组

2. 伪数组转换数组 
    let str = 'hello'
    let arr = [...arr] // ['h','e','l','l','o']
    let arr = Array.from(str) // ['h','e','l','l','o']
        Array.form(arguments, (value) => value + 1) // 第一个参数为类数组对象，第二个参数为映射函数

3. Array.find() and Array.findIndex()
    find() 查找值，findIndex() 查找索引，两者都只返回第一个满足条件的值

4. Array.isArray (x => n > 3) // 返回值为布尔值，用来判断是否为数组，参数为一个回调函数

5. Array.includes(searchElement, fromIndex) // 返回值为布尔值，判断数组是否包含一个值，第一个参数必填，查找的元素，第二个元素选填，查找的索引起始位置

6. forEach 循环遍历数组,没有return

​    7. map 映射,有return

8. filter 过滤,有return

9. reduce 映射,有return

10. some 检测,返回布尔值,如果为真,跳出全部训话,如果为假,继续循环

11. every 返回值是布尔值,如果为真,跳出本次循环继续,如果为假,跳出全部循环

12. keys() 返回值是一个包含遍历的 key 的数组，数组对象通用

13. values() 返回值是一个包含遍历的 value 的数组，数组对象通用

### 对象:

1. Object.is() 返回值为布尔值，用来判断两个参数是否相同，作用类似 ===

2. Object.assign() 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），
    Object.assign(target, source1, source2)
    后面的属性会覆盖前面的相同的属性
    参数如果只有一个，返回自身，如果不是对象，会转换为对象，然后返回，如果不能转换为对象，则报错
    常见用途是给对象添加属性和方法，类似于es5 的原型链上添加方法

3. Object.getOwnPropertyDescriptors() 
__proto__属性

4. Object.getPrototypeOf() 用于读取一个对象的原型对象
5. Object.setPrototypeOf() 用来设置一个对象的prototype对象，返回参数对象本身。
    // 格式
    Object.setPrototypeOf(object, prototype)
    // 用法
    const o = Object.setPrototypeOf({}, null);

6. Object.keys() 返回数组

7. Object.values() 返回数组

8. Object.entries() Object.entries的基本用途是遍历对象的属性。
    let obj = { one: 1, two: 2 };
    for (let [k, v] of Object.entries(obj)) {
    console.log(
        `${JSON.stringify(k)}: ${JSON.stringify(v)}`
    );
    }
    // "one": 1
    // "two": 2
9. Object.fromEntries() Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
    Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
    ])
    // { foo: "bar", baz: 42 }
    该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
    Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
    // { foo: "bar", baz: "qux" }

```
数组浅拷贝 '=' 直接赋值，那么给新的数组赋值，会因为引用类型的原因，影响到原数组
数组的深拷贝
1. 使用slice() 截取0 赋值给新的数组
2. 使用concat() 赋值给新的数组

多重数组的深拷贝
1. JSON.parse(JSON.stringify(state.YardsOrder))
2. function deepCopy(data) {
	 if (data.constructor.name === 'Array') { 
		// 判断为数组类型
	 	var arrCopy = []
	 	for (var i = 0, len = data.length; i < len; i++) {
		//遍历数组
			 if (data[i] instanceof Object) {
				// arrary object null以下有关于instanceof的注解
			 	arrCopy.push(deepCopy(data[i]))
			 } else { 
			// 基本类型
			 	arrCopy.push(data[i])
			 }
	 	}
	 	return arrCopy;
	
	 } else { // 为对象
 		var objCopy = {};
	 	for (x in data) {
			 if(data[x] instanceof Object){
			 	objCopy[x] = deepCopy(data[x])
			 }else{ // 基本类型
			 	objCopy[x] = data[x];
			 }
		}
		 return objCopy;
	}
 }
```

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


