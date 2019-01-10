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
		
	
























