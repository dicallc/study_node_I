使用node写了增，查的接口例子

技术：服务器：node+express+mongodb 客户端：Vue+bower

###  项目结构

<pre>
>app:服务器端文件
    >routes:路由配置
    >models:数据库model
    >controllers:接口控制器
>config:
    >config.js:环境配置文件
    >express.js:express初始化
    >mongoose.js:mongoose初始化

>public:
    >client:客户端例子
        >index.html首页
</pre>

### 使用

>如果你mongodb已经装好，同时已经启动

1. npm install
1. bower install 不看客户端可以忽略这一步
1. node ./bin/www

### Tips
客户端直接打开即可,因为例子太简单了，就没搞什么脚手架了，直接用Vue撸完了
