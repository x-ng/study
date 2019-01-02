前面我们提到过，经常用队列模拟排队的人。下面我们使用队列来模拟跳方块舞的人。当 男男女女来到舞池，他们按照自己的性别排成两队。当舞池中有地方空出来时，选两个队 列中的第一个人组成舞伴。他们身后的人各自向前移动一位，变成新的队首。当一对舞伴 迈入舞池时，主持人会大声喊出他们的名字。当一对舞伴走出舞池，且两排队伍中有任意 一队没人时，主持人也会把这个情况告诉大家。
为了模拟这种情况，我们把跳方块舞的男男女女的姓名储存在一个文本文件中：
F Allison McMillan 
M Frank Opitz 
M Mason McMillan 
M Clayton Ruff 
F Cheryl Ferenback 
M Raymond Williams 
F Jennifer Ingram 
M Bryan Frazer 
M David Durr 
M Danny Martin 
F Aurora Adney



每个舞者的信息存储在一个Dancer对象中:
function Dancer (name, sex) {
	this.name = name;
	this.sex = sex;
}

读取舞者信息:
function getDancers(males,females) {
	var names = read("dancers.txt").split("\n");
	for (var i = 0; i < names.length; i++) {
		names[i] = names[i].trim();
	}
	for (var i = 0; i < names.length; i++) {
		var dancer = names[i].split("");
		var sex = dancer[0];
		var name = dancer[1];
		if (sex = "F") {
			females.enqueue(new Dancer(name,sex));
		} else {
			males.enqueue(new Dancer(name, sex));
		}
	}
}

配对:
function dance (males,females) {
	console.log("this dance partners are: \n");
	while (!females.empty() && !males.empty()) {
		person = females.dequeue();
		putstr("Female dancer is: " + person.name);
		person = males.dequeue();
		console.log("and the dancer is :" + person.name);
	}
	console.log()
}

-------------------------------------------------------
优先队列:
// 定义存储队列元素的对象,code是优先程度
function Patient (name,node) {
	this.name = name;
	this.code = code;
}

// 定义dequeue方法,使其优先删除最高优先级的元素.



