## eventloop

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

总结: 

- 不同的任务会放进不同的任务队列之中。
- 先执行macro-task，等到函数调用栈清空之后再执行所有在队列之中的micro-task。	
- 等到所有micro-task执行完之后再从macro-task中的一个任务队列开始执行，就这样一直循环。

## web 优化部分

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

## TS部分

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

## return、continue、break 、continue 的区别 

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

