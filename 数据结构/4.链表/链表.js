function LList () {
	this.head = new Node("head");
	this.find = find;
	this.insert = insert;
	this.display = display;
}

function Node (element) {
	this.element = element;
	this.next = null;
}

function find (item) {
	var currNode = this.head;
	while (currNode.element != item) {
		currNode = currNode.next;
	}
	return currNode;
}

function insert (newElement, item) {
	var newNode = new Node(newElement);
	var current = this.find(item);
	newNode.next = current.next;
	current.next = newNode;
}

function display () {
	var currNode = this.head;
	while (!(currNode.next == null)) {
		console.log(currNode.next.element);
		currNode = currNode.next;
	}
}

// 主程序
var cities = new LList();
cities.insert("01","head");
cities.insert("02","01");
cities.insert("03","02");
cities.display();



// 从链表中删除节点时，需要先找到待删除节点前面的节点。找到这个节点后，修改它的 next 属性，使其不再指向待删除节点，而是指向待删除节点的下一个节点。我们可以定义 一个方法 findPrevious()，来做这件事。该方法遍历链表中的元素，检查每一个节点的下 一个节点中是否存储着待删除数据。如果找到，返回该节点（即“前一个”节点），这样 就可以修改它的 next 属性了
function findPrevious (item) {
	var currNode = this.head;
	while (!(currNode.next == null) && (currNode.next.element != item)) {
		currNode = currNode.next;
	}
	return currNode;
}

// remove
function remove (item) {
	var prevNode = this.findPrevious(item);
	if (!(prevNode.next == null)) {
		prevNode.next = prevNode.next.next;
	}
}



















