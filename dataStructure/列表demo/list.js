var movies = read(films.txt).split("\n");

function createArr (file) {
	var arr = read(file).split("\n");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim();
	}
	return arr;
}

var moviesList = new List();
for (var i = 0; i < movies.length; i++) {
	moviesList.append(movies[i]);
}

function displayList (list) {
	for (list.front(); list.currPos() < list.length(); list.next()) {
		console.log(list.getElement());
	}
}