## git命令行:

### 流程:

​	git status // 修改过文件但是没操作过

​		git add <file> 提交

​		git checkout -- <file> 丢弃工作目录中的更改 (git checkout . 所有的)

​	git add .	// 提交

​	git status // 提交过撤回

​		git reset HEAD <file>  取消暂停,退回到类似提交前的状态

​		git checkout -- <file>  丢弃目标file 的修改

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