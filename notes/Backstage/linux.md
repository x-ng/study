## 1.linux 基本命令
	删除
	    rm [f 忽略不存在的文件,不会警告 i 删除前询问 r 递归删除] 	 
	移动? 重命名
	    mv [f 同上 i 同上 u 文件较新时更新]
	创建文件夹
	    mkdir [m 配置文件权限,直接配置 p 将所需的上级目录递归创建起来]	
	删除文件夹
	    rmdir [p 连同上级的空目录一起删掉]	
	列出目录
	    ls [l 长数据列出,包含文件属性和权限 d 列出目录 a 全部文件]       		
	切换目录
	    cd [~ 根目录]
	显示当前的目录
	    pwd [-P 显示确实路径,而不是连接路径] 
	复制
	    cp [a -pdr
	        d 复制连接的文档连接属性
	        f 强制执行,若文件已存在,移除再尝试 
	        i 存在时询问 
	        p 文件属性一起复制
	        r 递归,用于目录的复制行为] 
	查看帮助
	    man
	ctrl组件键位
		ctrl+s:停止bash刷新
		ctrl+q:开始
		ctrl+
	    ctrl+a:光标移到行首。
	    ctrl+b:光标左移一个字母
	    ctrl+c:杀死当前进程。
	    ctrl+d:delete
	    ctrl+e:光标移到行尾。
	    ctrl+h:删除光标前一个字符，同 backspace 键相同。
	    ctrl+k:清除光标后至行尾的内容。
	    ctrl+l:清屏，相当于clear。
	    ctrl+r:搜索之前打过的命令。会有一个提示，根据你输入的关键字进行搜索bash的history
	    ctrl+u: 清除光标前至行首间的所有内容。
	    ctrl+w: 移除光标前的一个单词
	    ctrl+t: 交换光标位置前的两个字符
	    ctrl+y: 粘贴或者恢复上次的删除
	    ctrl+d: 删除光标所在字母;注意和backspace以及ctrl+h的区别，这2个是删除光标前的字符
	    ctrl+f: 光标右移
	    ctrl+z : 把当前进程转到后台运行，使用’ fg ‘命令恢复。比如top -d1 然后ctrl+z ，到后台，然后fg,重新恢复
	esc组合
	    esc+d: 删除光标后的一个词
	    esc+f: 往右跳一个词
	    esc+b: 往左跳一个词
	    esc+t: 交换光标位置前的两个单词。

## 2.文件内容查看​	
    最后一行显示
        tac [同上]
    
    显示行号 
    nl [b a 显示空行行号
    b t 空行没行号
    n ln 行号在左边显示
    n rn 自己栏位的右边显示,bujia0
    n rz 加0]
    
    一页一页
    more [space 向下翻页
    enter 一行
    :f 立刻显示名字和行数
    q 离开
    b 往回翻页]
    
    less
    
    取文件前面几行
    head [-n number]
    tail

## 3.vim 键位

    命令模式:
    i 切换到输入
    a
    o 另起一行
    r 替换
    
    x 删除
    : 切换到底线命令模式
    ctrl + f,b,d,u
    +,- 对其
    数字 + space 跳多少行
    0 home
    $ end
    H 屏幕最上面
    M 中间
    L 最后
    
    G 文档最后
    数字 + G 调到多少行
    gg 第一样
    
    /word 查询
    ?word 向上
    
    dd 剪切一行
    数字 + dd 
    d1G
    dG
    d$
    d0
    
    yy 复制一行
    nyy
    ...
    
    p 复制到下一行 P 上一行
    
    J 合拼成一行
    
    u 复原
    ctrl + r 重复
    
    v 块级选择
    V 多行选择
    
    输入模式:
    esc 切换到命令模式
    
    底线命令模式:
    q 退出
    w 保存
    
    :set nu
    :set nonu
    
    sudo su - root
    
    安装VMware
    安装Xhell
    VMware安装ubuntu
    VMware设置静态地址
    
    ctrl + s 暂停bash页面
    ctrl + q 继续
    ctrl + n 匹配
    shift + <  >  tab空格


## 4.linux 基本文件及其操作

/bin 存放经常使用的命令

/boot 这里存放的是启动linux的一些核心文件,包括一些连接文件以及镜像文件

/dev 存放的是linux的外部设备,在linux中访问设备的方式和访问文件的方式是一样的

/etc 存放所有的系统管理所需要的文件和子目录

/home 用户的主目录

/lib 这个目录里存放着系统最基本的动态连接共享库

/lost+found 系统非法关机时存放一些文件

/media linux系统会自动识别一些设备,例如U盘

/mnt 系统提供该目录未来让用户临时挂载别的文件系统

/opt 给主机额外安装软件所摆放的目录,比如oracle数据库就可以放在这个目录下的

/proc 虚拟的目录,是系统内存的映射,可以通过这个目录来获取系统信息,这个目录的内容在内存里,不在硬盘上

/root 系统管理员,

/sbin 存放的是系统管理员使用的系统管理程序

/selinux 类似于防火墙

/srv 存放一些服务启动之后需要提取的数据

/sys 

/tmp 存放临时文件

/usr 用户的应用程序和文件,类型与 program files目录

/usr/bin 系统用户使用的应用程序

/usr/src 内核源代码默认的放置目录

/var 存放不断扩充的东西,将经常修改的目录放在这,包括日志文件

### 4.1 防火墙

防火墙根据配置文件 /etc/sysconfig/iptables 来控制本机的出入网络访问行为其对行为的配置策略哟四个策略表

| 基本操作指令                   |                                               |
| ------------------------------ | --------------------------------------------- |
| 查看防火墙状态                 | service iptables status                       |
| 开启防火请                     | service iptables start                        |
| 关闭防火墙                     | service iptables stop                         |
| 关闭防火前开机自启             | chkconfig iptables off                        |
| 列出iptables规则               | iptables -L -n                                |
| 列出iptables规则并显示规则编号 | iptables -L -n --line-numbers                 |
| 禁止SSH登录                    | iptables -A INPUT -p tcp --dport 22 -j DROP   |
| 加入一条INPUT规则开放80端口    | iptables -L INPUT -p tcp --dport 80 -j ACCEPT |

### 4.2 用户和组

| 用户和组   |                                                          |
| ---------- | -------------------------------------------------------- |
| 管理员root | 具有系统所有权限的用户,UID为0                            |
| 系统用户   | 保障系统运型的用户,一般不提供密码登录系统,UID为1~499之间 |
| 普通用户   | 一般用户,其使用权限的受限,UID为500-60000                 |

/etc/passwd

​	root:用户名

​	x:密码占位符

​	0:用户id,UID

​	0:组id,GID

​	root:注释信息

​	/root:用户家目录

​	/bin/bash:用户默认使用shell

/etc/shadow

​	登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志

| 用户组类型    | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| 系统组        | 一般加入一些系统用户                                         |
| 普通用户组    | 可以加入多个用户                                             |
| 私有组/基本组 | 当创建用户时,没有为其指明所属组,则就为其定义一个私有的用户组,起名称与用户名同名,当吧其他用户加入到该组时,就变成了普通组 |

/etc/group		组名:组密码占位符:组id
/etc/gshadow		

#### 4.2.1 用户操作

| 用户操作                              |                                          |
| ------------------------------------- | ---------------------------------------- |
| grep renwu /etc/group                 | 确认是否存在任务组                       |
| groupadd renwu                        | 创建组                                   |
| useradd -G renwu zhangsan             | 将zhangsan加入到用户组                   |
| passwd zhangsan                       | 设置密码                                 |
| id zhangsan                           | 查看用户属性                             |
| useradd -G aaa,bbb,ccc,renwu zhangsan | 将用户添加到不同的附加用户组中           |
| useradd -g renwu lisi                 | 增加一个新用户到主要用户组               |
| usermod -a -G apache lisi             | 将一个已有的用户增加到一个已有的用户组中 |

#### 4.2.2 组操作

| 组操作                       |                             |
| ---------------------------- | --------------------------- |
| groupadd bigdata             | 添加一个叫bigdata的组       |
| cat /etc/group               | 查看系统当前有哪些组        |
| usermod -G bigdata spark     | 将hadoop用户添加到bigdata组 |
| gpasswd -d spark bigdata     | 将spark用户从bigdata组删除  |
| groupmod -n bigspark bigdata | 将biddata组名修改为bigspark |
| groupdel bigdata             | 删除组                      |

#### 4.2.3 为用户配置sudoer权限

vi /etc/sudoers

配置

root	ALL=(ALL)	ALL

demo	ALL=(ALL)	All

### 4.3 文件权限

ls -l
drwxrwxrwx		d 文件类型	rwxrwxrwx 文件权限
6				链接数
xyd				文件或者目录的所属者
xyd 			        所属用户组	
4096			文件或目录的代销,是目录的话一般是4096
mar 24 11:20	文件的最后编辑日

#### 4.3.1 文件类型

d				目录
\-				普通文件
l				链接文件
c				字符设备文件
b				二进制设备文件

#### 4.3.2 文件权限	

第一组			rwx 文件拥有者对它的权限
第二组			rwx 表示这个文件的所属组用户对它的权限
第三组			rwx 表示这个文件的其他用户对它的权限

#### 4.3.3 修改文件权限

chmod g-rw haha.dat		表示将haha.dat对所属组的rw权限取消
chmod o-rw haha.dat		表示将haha.dat对其他人的rw权限取消
chmod u + x haha.dat 	表示将haha.dat对所属用户的权限增加x			
chmod a - x haha.dat	表示将haha.dat对所用户取消X权限

#### 4.3.4 修改文件所有权

chowm angela aaa		改变所属用户
chowm :angela aaa		改变所属组
chowm angle:angle aaa	同时改变所属用户和所属组

### 4.4 压缩打包

| .gzip                                   |        |
| --------------------------------------- | ------ |
| gzip ma.txt                             | 压缩   |
| gzip -d ma.txt.gz 或者 gunzip ma.txt.gz | 解压缩 |

| .bzip2                                       |        |
| -------------------------------------------- | ------ |
| bzip ma.dat                                  | 压缩   |
| bzip -d ma.dat.bz2 或者	bunzip ma.dat.bz2 | 解压缩 |

| .tar                       |                                     |
| -------------------------- | ----------------------------------- |
| tar -cvf ma.txt.tar ma.txt | 将ma.txt打包,名字一般以.tar作为后缀 |
| tar -xvf ma.txt.tar        | 解包                                |

>重点

| 打包以及压缩                  |                            |
| ----------------------------- | -------------------------- |
| tar -zcvf ma.tar.gz /root/ma/ | 打包并压缩                 |
| tar -zxvf ma.tar.gz           | 解包并解压缩               |
| tar -zxbf ma.tar.gz -C ../a   | 解包并解压缩到其他指定目录 |
| 其他                          |                            |
| tar -ztvf ma.tar.gz           | 查看压缩包内容             |
| tar -jcvf a.tar.bz2           | 打包并压缩成bz2            |
| tar -jxvf a.tar.bz2           | 解压bz2                    |

| 参数         |                           |
| ------------ | ------------------------- |
| z: gzip      | 通过gzip格式压缩或解压    |
| c: create    | 创建压缩文件              |
| x: extract   | 解压缩文件,或者叫还原文件 |
| v: verbose   | 显示过程                  |
| f: file      | 指定文件                  |
| t: list      | 列出文件                  |
| j: 支持bzip2 | 压缩和解压缩              |

### 4.5 网络管理

#### 4.5.1 网络命令

* ifconfig	命令

  ifconfig	配饰网络接口

  eth0	活动的以太网

  lo 		本地回环网络地址

  inconfig eth0 up/down	开启/关闭网络接口

* ping命令	

  测试网络连接是否正常

* host命令	

  host命令用来进行DNS查询

* netstat命令    

  ​	netstat命令可以显示网络接口的统计信息, 包括打开的socket和路由表

  ​	常用命令选项

  ​		-a(all)	显示所有选项

  ​		-t(tcp)	仅显示tcp相关选项

  ​		-u(udp)	仅显示udp相关选项

  ​		-n		拒绝显示别名,能显示数字的全部转化为数字

  ​		-l		仅列出有在listen(监听)的服务状态

  ​		-p		显示建立相关连接的程序名

  ​		-r		显示路由信息, 路由表

  ​		-e		显示扩展信息, 例如uid等

  ​		-s		按照各个协议进行统计

  ​		-c		每隔一段时间, 执行该命令

  ​	例子

  ​		netstat -nltp		查看那个程序占用了那个端口

#### 4.5.2 网络配置

- 修改主机名

  hostname		查看主机名

  hostname demo	暂时性修改一次主机名

  vi /etc/sysconfig/network 	永久修改主机名 

  ​	NETWORKING=yes

  ​	HOSTNAME=demo1

- 配置主机映射

  - 编辑配置文件/etc/hosts
  - 添加ip 主机名

### 4.6 Httpd服务

apache http web 服务器在后服务名称,默认端口为80

* 检查本机的httpd服务是否开启, 使用命令为: service --status-add | grep httpd  或者 sevice httpd status
* 开启httpd服务, 使用命令为: service httpd start
* 访问web服务器
  * 我们通过浏览器用http协议访问
  * 防火墙需要开放80端口或者关闭service iptables stop
  * /var/www/html 这个目录下是我们存放资源的地方, 