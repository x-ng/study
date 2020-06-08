var movies = read(films.txt).split("\n");

// 分成数组,并去掉空格
function createArr (file) {
	var arr = read(file).split("\n");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim();
	}
	return arr;
}

// 使用列表管理
var moviesList = new List();
for (var i = 0; i < movies.length; i++) {
	moviesList.append(movies[i]);
}

// 显示所有的清单
function displayList (list) {
	for (list.front(); list.currPos() < list.length(); list.next()) {
		console.log(list.getElement());
	}
}

function displayList (list) {
	for (list.front(); list.currPos() < list.length(); list.next()) {
		if (list.getElement() instanceof Customer) {
			console.log(list.getElement()["name"] + "," + list.getElement()["movie"]);
		} else {
			console.log(list.getElement());
		}
	}
}