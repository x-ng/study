## git命令行:

### 流程:

​	git status // 修改过文件但是没操作过

​		git add <file> 提交

​		git checkout -- <file> 丢弃工作目录中的更改 (git checkout . 所有的)

​	git add .	// 提交      和git add . 对应的是 git rm –cached

​	git status // 提交过撤回

​		git reset HEAD <file>  取消暂停,退回到类似提交前的状态

​		git checkout -- <file>  丢弃目标file 的修改

​	git  commit -m "message" // 提交

​	git status

​		git commit --amend // 修改注释

​		git reset --soft HEAD^	// 代码回滚

​		`git reset –soft xx版本号xxxx`

​		`git reset –soft HEAD~1`

​			参数:--mixed 默认参数,不修改工作空间代码,撤销commit,并撤销gir add.操作

​				--soft 不删除工作空间代码, 撤销commit, 不撤销git add . (只是改变HEAD的指向,本地源码不会变化)

​				--hard 删除工作空间改动代码, 撤销commit , 撤销git add . (改变本地源码)

​	git  push origin <branch>

<!-- ​	git reset --soft HEAD~1 -->
git revert HEAD

​		原理同上:

​		git push origin 分支 --force



### 操作:

其他操作:

​	git pull origin <2.6> 拉取远程分支2.6的代码

创建分支:

​	git checkout <branch_name> 创建分支

​	git push origin local-branch:remote-branch // 推送本地local-banrch到远程origin的remote-branch分支

新建本地分支与远程分支关联:

​	git branch -set-upstream 本地新建分支名 origin/远程分支名



创建并切换到:

​	git checkout -b <branch_name>  <origin/远程分支名>	// 拉取远程分支并同时创建对应的本地分支

直接拉取远程分支同步到本地:

​	git checkout --track origin/dye_erp1.7



提交本地分支到远程分支:

​	git push origin 本地分支名



暂存起来:

​	git stash 暂存

​	git stash list 暂存列表

​	git stash pop 取出暂存



合并分支:

​	gir merge <branch_name> // 合并分支到目前分支

删除分支:

​	git branch -d <branch_name>

查看所有分支:

​	git branch -a

查看远程分支:

​	git branch -r

远程仓库相关命令:

​	git push origin test:origin // 提交本地test分支作为远程的master分支

​	git push origin :test	// 左边的为空,就删除远程的test分支

### git https 切换 ssh

查看方式

​	git remote -v

切换

​	git remote set-url origin <targt_address>


## MD 方法

---

### 标题

- 无序列表  

1. 有序列表

 *倾斜*

**加粗**

***

> 说明和引用


```
代码框
```

~~删除线~~

[链接](www.baidu.com)

![图片]()

+ [x] Markdown  
+ [ ] JavaScript 



![]()



|      |      |      |
| :----: | :----: | :----: |
|      |      |      |
|      |      |      |
|      |      |      |

[md语法](https://www.appinn.com/markdown/)

