const Koa = require("koa");
const app = new Koa();
app.use((ctx) => {
  ctx.body = "hi, my name is aCui ~~~~!!!!";
});

app.listen(3007)
