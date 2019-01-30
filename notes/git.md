## git命令行:

### 流程:

​	git status
​	如果修改过文件没提交
​		git checkout - <file>  放弃工作目录中的修改
​		git add 来更新提交		
​	git add .	
​	(使用“git reset HEAD <file> ...”取消暂停)

​	git  commit -m "message" // 提交

​	git  push origin <branch>

### 操作:

还原
git reset HEAD <file>
git checkout - <file>



git commit -m ""
git push
其他操作:
git pull origin <2.6> 拉取远程分支2.6的代码
git rm <file>
创建分支:
git checkout <branch_name> 创建分支
git push origin local-branch:remote-branch // 推送本地local-banrch到远程origin的remote-branch分支
git checkout -b <branch_name> // 创建+切换
合并分支:
gir merge <branch_name> // 合并分支到目前分支
删除分支:
git branch -d <branch_name>