// fs.stat 检测是文件还是目录
	const fs = require("fs");
	fs.stat('hello.js', (error, stats) => {
		if (error) {
			console.log(error)
		} else {
			console.log(stats)
			console.log(`文件: ${stats.isFile()}`)
			console.log(`目录: ${stats.isDirectory()}`)
		}
	})

// fs.mkdir 创建目录
	const fs = require('fs')
	
	fs.mkdir('logs', (error) => {
		if (error) {
			console.log(error)
		} else {
			console.log('成功创建目录: logs')
		}
	})

// fs.writeFile 创建写入文件
	fs.writeFile('logs/hello.log','你好~\n',(error) => {
		if (error) {
			console.log(error)
		} else {
			console.log("成功写入文件")
		}
	})
	
// fs.appendFile 追加文件
	fs.appendFile('logs/hello.log','hello~/n',(error) => {
		if (error) {
			console.log(error)
		} else {
			console.log('写入成功')
		}
	})

// fs.readFile 读取文件
	const fs = require('fs')
	
	fs.readFile('logs/hello.log','utf8', (error,data) => {
		if (error) {
			console.log(error)
		} else {
			console.log(data)
		}
	})
	
// fs.readdir 读取目录
	const fs = require('fs')
	fs.readdir('logs', (error, files) => {
		if (error) {
			console.log(error)
		} else {
			console.log(files)
		}
	})

// fs.rename 重命名
	const fs = require('fs');
	fs.rename('js/hello.log','js/greeting.log',(error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('rename success');
		}
	}

// fs.rmdir 删除目录
	const fs = require('fs')
	fs.rmdir('logs', (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('delete success');
		}
	})

// fs.unlink 删除文件
	const fs = require('fs')
	fs.unlink(`logs/${file}`, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('delete suceess');
		}
	})

// fs.createReadStream 从文件流中读取数据
	const fs = require('fs');
	var fileReadStream = fs.createReadStream('data.json')
	let count = 0;
	var str = '';
	fileReadStream.on('data',(chunk) => {
		console.log(`${++count}接受到: ${chunk.length}`);
		str+=chunk
	})
	fileReadStream.on(`end`, () => {
		console.log('--结束--');
		console.log(count);
		console.log(str);
	})
	fileReadStream.on('error',(error) => {
		console.log(error);
	})
	
// fs.createWriteStream 写入文件
	var fs = require('fs');
	var data = 'demo数据';
	var writeStream = fs.createWriteStream('output.txt');
	writeStream.write(data,'UTF8');
	writeStream.end();
	writeStream.on('finish', () => {
		console.log(`写入完成`);
	})
	writeStream.on('error', (err) => {
		console.log(err.stack);
	})
	console.log('程序执行完毕');

// 管道流
	var fs = require('fs');
	var readerStream = fs.createReadStream('input.txt')
	var writeStream = fs.createWriteStream('output.txt')
	readerStream.pipe(writeStream);
	console.log('程序执行完毕');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	