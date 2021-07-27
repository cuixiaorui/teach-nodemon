const Koa = require("koa");
const app = new Koa();
app.use((ctx) => {
  ctx.body = "hi my name is cuixiaorui1111222233333";
});

app.listen(3000);
// nodemon
// 1. 当代码改变的时候
//   - fs.watch()
//   - chokidar

// 2. 重新的启动服务(kill)
//   - node main.js -> command
//   - nodejs -> exec  || spawn
