## 学习 nodemon 的实现原理

- [视频](https://www.bilibili.com/video/BV1Rf4y157ad)
- [文章](https://mp.weixin.qq.com/s/HHmVjCgAIe7WPJMPw-u0og)


## 授课
以问题来驱动教学

1. 写了一个 koa server ，但是每次都需要重启才能看到新的内容
2. 那我能不能动态的更新呢？
3. 那么我需要知道他是在什么时候更新的呢？
   1. 使用 fs.watch
      1. 但是 fs.watch 有很多的问题，比如在 mac 下的支持有问题
      2. 所有选择使用 chokidar 

4. 使用 chokidar 来观察文件的变更情况，然后如何重新执行我的要执行的文件呢？
   - 需要支持我的 koa server 这个脚本
   - 在 nodejs 中可以使用 exec 和 spawn 
     - 他俩有什么区别呀？
       - exec 是个同步的 而 spawn 是通过流的模式来调用
         - exec 我必须等待它全部执行完，比如它执行的脚本需要等待 5秒
         - spawn 会在执行的时候，就把结果通过流的模式发出来了
       - 所以这里选择 spawn

5. 我现在可以执行文件了，但是它告诉我端口被占用了，这是怎么回事呢？
   1. 哦，原来用 spawn 起来的子进程并没有被干掉，所以端口一直是被占用的，那把子进程杀死就好了呀
   2. 那怎么给把子进程杀死呢？
      1. 使用 childProcess （由 spawn 返回的进程对象 ）的 .kill("SIGTERM") 来杀死这个进程
	- 那这里的 kill 都可以给传入什么参数呢？
      	- 这个就是操作系统的知识了。需要去看看
   3. 杀死之后在重启


6. 最后我在把上面的所有流程封装一下，就可以使用了
7. 但是还是有问题，比如文件我保存了但是我并没有做任何的改变，那么也不能一直 kill child, 如何去优化呢？
   1. 连续的事件只需触发一次回调的场合，就可以使用 debounce ,也就是防抖。来进行优化

### 知识点总结
- 使用 chokidar 来观察文件的变化
- 在nodejs 中可以使用 exec 和 spawn 来执行 command
- exec 和 spawn 的区别
- 使用 .kill("SIGTERM") 杀死子进程
- 使用 debounce 来优化程序

## 参考
- [nodekeeper](https://github.com/Pankajtanwarbanna/nodekeeper)
