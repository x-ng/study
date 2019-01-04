1.数组
	var number = [];
	var numbers = new Array(1,2,3,4,5);
	var numbers = new Array(10);
	数组中的值可以不是同一种数据类型
	arrat.isArray();	判断是不是数组
	
	存取函数:
	indexOf();	查找
	split();	字符串数组操作
	join();		数组字符串话操作
	concat();	数组连接
	splice();	截取
2.列表
 listSize（属性）	列表的元素个数
 pos （属性） 		列表的当前位置 
 length （属性） 	返回列表中元素的个数 
 clear （方法）		清空列表中的所有元素 
 toString （方法） 	返回列表的字符串形式 
 getElement （方法）返回当前位置的元素 
 insert （方法） 	在现有元素后插入新元素 
 append （方法） 	在列表的末尾添加新元素 
 remove （方法） 	从列表中删除元素 
 front （方法） 	将列表的当前位置设移动到第一个元素 
 end （方法） 		将列表的当前位置移动到最后一个元素 prev（方法）		  将当前位置后移一位 
 next （方法） 		将当前位置前移一位 
 currPos （方法） 	返回列表的当前位置 
 moveTo（方法） 	将当前位置移动到指定位置

	2.1 append: 给列表添加元素
		function append(ele) {
			this.dataStore[this.listSize] = ele;
		}
	2.2 remove: 从列表中删除元素
		function remove (ele) {
			ver foundAt = this.find(ele);
			if (foundAt > -1) {
				this.dataStore.splice(foundAt,1);
				-- this.listSize;
				return ture;
			}
			return false;
		}
	2.3 find: 列表查找某一元素
		function find(ele) {
			for (var i = 0; i < this.dataStore.length; i++) {
				if (this.dataStore[i] == ele) {
					return i;
				}
			}
			return -1;
		}
	2.4 length: 多少个元素
		function length () {
			rerutn this.dataStore;
		}
	2.5 insert: 向列表中插入一个元素
		function insert (ele,after) {
			var insertPos = this.find(after);
			if (insertPos > -1) {
				this.dataStore.splice(insertPos+1,0,ele);
				++this.listSize;
				return true;
			}
			return false;
		}
	2.6 toString: 显示列表中的元素
		function toString () {
			return this.dataStore;
		}
	2.7 clear: 清空列表中的所有元素
		function clear () {
			delete this.dataStore;
			this.dataStore = [];
			this.listSize = this.pos = 0;
		}
	2.8 contains: 判断给定值是否在列表中
		function contains (ele) {
			for (var i = 0; i < this.dataStore.length; i++) {
				if (this.dataStore[i] == element) {
					return true;
				}
			}
			return false;
		}
	2.9 遍历数组
		function front () {
			this.pos = 0;
		}
		function end () {
			this.pos = this.listSize-1;
		}
		function prev () {
			if (this.pos > 0) {
				--this.pos;
			}
		}
		function next () {
			if (this.pos < this.listSize-1) {
				++this.pos;
			}
		}
		function currPos () {
			return this.pos;
		}
		function moveTo (postion) {
			this.pos = postion;
		}
		funciton getElement () {
			return this.dataStore[this.pos];
		}
		
		列表访问实例:
			var names = new List();
			names.append("01");
			names.append("02");
			names.append("03");
			names.append("04);
			names.append("05");
			names.append("06");
			names.append("07");
			names.append("08");
			
			names.front();
			console.log(names.getElement());
			names.next();
			console.log(names.getElement());
			names.prev();
			console.log(names.getElement());
			
			for (names.end(); names.currPos() >=0; names.prev()) {
				console.log(names.getElement());
			}
			
3.栈
	3.1 栈的实现
		funciton Stack () {
			this.dataStore = [];
			this.top = 0;
			this.push = push;
			this.pop = pop;
			this.peek = peek;
		}
		
		// 压栈
		funciton push (ele) {
			this.dataStore[this.top++] = ele;
		}
		
		// 弹栈
		funciton pop () {
			return this.dataStore[--this.top];
		}
		
		// 返回栈顶元素
		funciton peek () {
			rerurn this.dataStore[this.top-1];
		}
		
		funciton length () {
			rerurn this.top;
		}
		
		funciton clear () {
			this.rop = 0;
		}

4.队列
	funciton Queue () {
		this.dataStore = [];
		this.enqueue = enqueue;
		this.dequeue = dequeue;
		this.front = front;
		this.back = back;
		this.toString = toString;
		this.empty = empty;
	}
	
	// 队尾添加元素
	funciton enqueue (element) {
		this.dataStore.push(element);
	}
	
	// 删除队首元素
	funciton dequeue () {
		return this.dataStore.shift();
	}
	
	// 读取队首.对尾的元素
	funciton front () {
		return this.dataStore[0];
	}
	function back () {
		return this.dataStore[this.dataStore.length-1];
	}
	
	// 显示队列中的所有元素
	function toString () {
		var retStr = "";
		for (var i = 0; i < this.dataStore.length; i++) {
			retStr += this.dataStore[i] + "\n";
		}
		return retStr;
	}
	
	// 判断队列是否为空
	funciton empty () {
		if (this.dataStore.length == 0) {
			return ture;
		} else {
			return false;
		}
	}

5.链表
	头结点: header 
	尾节点: null
	我们设计的链表包含两个类。Node 类用来表示节点，LinkedList 类提供了插入节点、删除 节点、显示列表元素的方法，以及其他一些辅助方法。
	
	node类:
		funciton Node (ele) {
			this.ele = ele;
			this.next = null;
		}
	linkedList类:
		funciton LList () {
			this.head = new Node("head");
			this.find = find;
			this.insert = insert;
			this.remove = remove;
			this.display = display;
		}
		
		// find() 方法演示了如何在链表上进行移动。首先，创建一个新节点，并将链表的头节点赋 给这个新创建的节点。然后在链表上进行循环，如果当前节点的 element 属性和我们要找 的信息不符，就从当前节点移动到下一个节点。如果查找成功，该方法返回包含该数据的 节点；否则，返回 null
		funciton find (item) {
			var currNode = this.head;
			while (currNode.ele != item) {
				currNode = currNode.next;
			}
			return currNode;
		}
		
		funciton insert (newEle, item) {
			var newNpde = new Node(newEle);
			var current = this.find(item);
			newNode.next = current.next;
			current.next = newNode;
		}
		
		funciton display () {
			var currNode = this.head;
			while (!(currNode.next == null) {
				console.log(curNode.next.element);
				currNode = curNode.next;
			})
		}
	
	5.1 双向链表
		funciton Node (element) {
			this.element = element;
			this.next = null;
			this.previous = null;
		}
		
		funciton insert (newElement, item) {
			var newNode = new Node(newElement);
			var current = this.find(item);
			newNode.next = current.next;
			newNode.previous = current;
			current.next = newNode;
		}
		
		// remove()方法
		funciton remove(item) {
			var currNode = this.find(item);
			if (!(currNode.next == null)) {
				currNode.previous.next = currNode.next;
				currNode.next.previous = currNode.previous;
				currNode.next = null;
				currNode.previous = null;
			}
		}
		
		// 找到最后一个值
		funciton findLast () {
			var currNode = this.head;
			while (!(currNode.next == null)) {
				currNode = currNode.next;
			}
			return currNode;
		}
		
		// 反序
		funciton disReverse () {
			var currNode = this.head;
			currNode = this.findLast();
			while (!(currNode.previous == null) {
				console.log(currNode.element);
				currNode = currNode.previous;
			})
		}
	
	5.2 循环列表
		// 创建循环链表,只需要修改LList类的构造函数
		funciton LList () {
			this.head = new Node("head");
			this.head.next = this.head;
			this.find = find;
			this.insert = insert;
			this.display = display;
			this.findPrevious = findPrevious;
			this.remove = remove;
		}
		// 循环列表的display()方法
		funciton display () {
			var currNode = this.head;
			while (!(currNode.next == null) && !(currNode.next.element=="head")) {
				console.log(currNode.next.element);
				currNode = currNode.next;
			}
		}
6.字典
	// 定义一个Dictionary类
	funciton Dictionary () {
		this.dataStore = new Array();
	}
	
	// 定义add方法
	funciton add (key,value) {
		this.dataStore[key] = value;
	}
	
	// 定义find方法,以键为参数,返回关联值
	funciton find (key) {
		return this.dataStore[key];
	}

	// 删除
	funciton remove(key) {
		delete this.dataStore[key];
	}

	// 展示所有
	funciton showAll () {
		for (var key in Object.keys(this.dataStore)) {
			console.log(key + "->" + this.dataStore[key]);
		}
	}
	
	var pbook = new Dictionary();
	pbook.add("mike1","123");
	pbook.add("mike2","345");
	pbook.add("mike3","456");
	pbook.add("mike4","678");
	console.log("mike2 extension:" + pbook.find("mike2"));
	pbook.remove("mike2");
	pbook.showAll();
	
	// 辅助方法 
	funciton count () {
		var n = 0;
		for (var key in Object.keys(this.dataStore)) {
			++n;
		}
		return n;
	}
	funciton clear () {
		for each (var key in Object.keys(this.dataStore)) {
			delete this.dataStore[key];
		}
	}
	
	// 重新定义showAll
	funciton showAll () {
		for (var key in object.keys(this.dataStore).sort()){
			console.log(key + "->" this.dataStore[key]);
		}
	}
	
7散列
	funciton HashTable () {
		this.table = new Array(137);
		this.simpleHash = simpleHash;
		this.showDistro = showDistro;
		this.put = put;
		// this.get = get;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	