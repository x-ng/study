

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


