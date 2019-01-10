// 数据库的使用
	// 开启mongoDB服务  mongod -dbpath c:/mongodb
	// 管理mongodb数据库 mongo
	// 查看所有数据库列表 show dbs
	
// 创建数据库
	use student
	// 如果数据库想要创建成功,就必须插入一个数据
	db.student.insert({"name"."xiaoming"});
	// 显示所有的数据集合(表)
	show collections
	// 删除数据库
	db.dropDatabase();
	// 删除集合
	db.user.drop()
	
// 插入数据
	// 随着数据的插图,数据库也创建成功
	db.表明.insert({"name":"zhangsan"});

// 查找数据
	// 查询所有记录
		db.userinfo.find();
	// 查询去重后的数据
		db.userinfo.distinct("name");
		select distinct name from userinfo;
	// 查询age = 22 的记录
		db.userinfo.find({"age":22});
		select * from userinfo where age = 22;
	// 查询age > 22 的记录
		db.userinfo.find({age:{$gt:22}});
		select * from userinfo where age > 22;
	// 查询age < 22 的记录
		db.userinfo.find({age:{$it:22}})
		select * form userinfo where age < 22;
	// 查询age >= 25 的记录
		db.userinfo.find({age:{$gte:25}})
		select * from userinfo where age >= 25;
	// 查询age <= 25 的记录
		db.userinfo.find({age:{$lte:25}});
	// 查询age >= 23 且 age <= 26
		db.userinfo.dind({age:{$gte:23,$lte:26}});
	// 查询name中包含mongo的数据 模糊查询用于搜索
		db.userinfo.find({name:/mongo/});
		select * from userinfo where name like '%mongo%';
	// 查询name中 mongo 开头的
		db.userinfo.find({name:/^mongo^/});
		select * from userinfo where name like 'mongo%';
	// 查询指定列 name age 数据 age < 25
		db.userindo.find({age:{$gt:25}},{name:1,age:1});
		select name,age from userinfo where age > 25;
	// 查询 name = zhangsan , age = 22 的数据
		db.userinfo.find({name:'zhangsan',age:22})
		select * from userinfo where name = 'zhangsan' and age = '22'
	//	按照年龄排序 1 升序 -1 降序
		db.userinfo.find().sort({age:1})
		db.userinfo.find().sort({age:-1})
	// 查询前五条
		db.userinfo.find().limit(5)
		selecttop 5 * from userinfo;
	// 查询 10 条以后的数据
		db.userinfo.find().skip(10)
		select * from userinfo where id not in (selecttop 10 * from userinfo)
	// 查询在 5-10 之间的数据
		db.userinfo.find().limit(5).skip(10)
		// 可用于分页 limit 是 pageSize, skip 是第几页的 pageSize
	// or 与 查询
		db.userindo.find({$or:[{age:22},{age:25}]});
		select * from userinfo where age = 22 or age = 25;
	// findOne 查询一条数据
		db.userinfo.findOne();
		selecttop 1 * from userinfo;
		db.userinfo.find().limit(1)
	// 查询某个结果集的记录数据  统计数据
		db.userinfo.find({age:{$gte:25}}).count();
		select count(*) from userinfo where age >= 20;
		// 返回限制之后的记录数量
		db.userinfo.find().skip(10).limit(5).count(true);

// 修改数据	
	// 查询名字为xiaoming 把年龄改为16
	db.student.update({"name":"xiaoming"},{$set:{"age":16}})
	// 查询数学数据为70,把年龄改为33
	db.student.update({"score.shuxue":70},{$set:{"age":33}})
	// 更改所有匹配项目  默认情况下，update（）方法更新单个文档。 要更新多个文档，请使用update（）方法中的multi选项。
	db.student.update({"sex":"man"},{$set:{"age":33}},{mulit:true})
	// 完整替换,不在出现$set关键字
	db.student.update({"name":"xiaoming"},{"name":"daming","age":16})
	// 
	db.users.update({name:'lise'},{$inc:{age:50}},false,true);
	update users set age = age + 50 where name = 'lisi'
	//
	db.users.update({name:'lisi'},{$inc:{age:50},$set:{name:'hoho'}},false.true)
	update users set age = age + 50,name = 'hoho' where name = 'lisi'

// 删除数据
	db.collectionsNames.remove({"borough":"Manhattan"});
	db.users.remove({age:132});
	// 默认情况下，remove（）方法会删除与remove条件匹配的所有文档。 使用justOne选项将删除操作限制为仅匹配其中一个文档。
	db.restaurants.remove({ "borough": "Queens" }, { justOne: true });

// 索引基础
	// 索引是对数据库表中一列或多列的值进行排序的一种结构，可以让我们查询数据库变得 更快
	db.user.ensureIndex({"username":1})
	// 获取当前集合的索引
	db.user.getIndexes()
	// 删除索引的命令
	db.user.dropIndex({"username":1})
	
		// 复合索引
			db.user.ensureIndex({"username":1,"age":-1})
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
cls 
show dbs
use studnet  db.studnet.insert({"name":"xiaoming"})
show collections
db.dropDatabase() // 删除所在的库
db.COLLECTION_NAMe.drop() // 删除所在的表
db.userinfo.find()
db.userinfo.distinct() // 查询去重数据

// 修改数据
	db.collection.update(
		<query>,
		<update>,
		{
			upsert: <boolean>,
			mulit: <boolean>,
			writeConcern: <document>
		}
	)	
		query : update的查询条件，类似sql update查询内where后面的。
		update : update的对象和一些更新的操作符（如,,inc…）等，也可以理解为sql update查询内set后面的
		upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
		multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
		writeConcern :可选，抛出异常的级别。
	
	db.student.update({"name":"小明"},{$set:{"age":16}})
	
		以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。 
		multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
		
	完整替换, 不出现$set关键字:
		db.student.update({"name":"小明"},{"name":"大明","age":16})
		db.users.update({name:'lisi'},{$inc:{age:50},$set:{name:'hoho'}},false,true)
		db.users.update({name:'lisi'},{$inc:{age:50},$set:{name:'hoho'}},false,true)
		
	只更新第一条记录:
		db.col.update({"count":{$gt:1}},{$set:{"test2":"ok"}});
	
	全部更新:
		db.col.update({"count":{$gt:3}},{$set:{"test2":"ok"}},false,true);
	
	只添加第一条:
		db.col.update({"count":{$gt:4}},{$set:{"test":"ok"}},true,false)
		
	全部添加进去:
		db.col.update({"count":{$gt:15}},{$inc:{"count":1}},false,true)
		
	只更新第一条:
		db.col.update({"count":{$gt:10}},{$inc:{"count":1}},false,false)
		
	3.2版本后:
		db.collection.updateOne()
		db.collection.updateMany()
		
		更新单个文档:
			db.collection.updateOne({"name":"abc"},{$set:{"age":"28"}})
		更新多个文档:
			db.collection.updateMany({"age":{$gt:"10"}},{$set:{"status":"xyd"}})
			
// 删除数据
	db.collection.remove(<quert>,<justOne>)
	db.collection.remove(<quert>,
	{
		justOne:<boolean>,
		writeConcern: <document>
	})























