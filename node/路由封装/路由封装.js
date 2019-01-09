var app = function (req,res) {
	console.log('app');
}

app.get = function () {
	console.log('app.get');
}

app.post = function (string,callback) {
	console.log('app.post');
}

app.get();
app.post();