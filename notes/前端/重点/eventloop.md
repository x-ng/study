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
