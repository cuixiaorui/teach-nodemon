const chokidar = require("chokidar");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

// exec("node main.js", (data) => {
//   console.log(data);
// });

// spawn("node", ["main.js"], {
//   stdio: [process.stdin, process.stdout, process.stderr],
// });

let childProcess;
let debounceRestart = debounce(restart, 1500);

chokidar
  .watch(["main.js"], {
    ignored: "**/node_modules/**",
  })
  .on("all", (type, fileName) => {
    //     console.log(type, fileName);
    //     console.log("File changes detected");

    console.log("all");
    debounceRestart();
  });

// 防抖
// 这样的话，只需要最后在执行 restart 就可以了
function debounce(fn, time) {
  let id = 0;
  return () => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn();
    }, time);
  };
}

function restart() {
  console.log("restart");
  if (childProcess) {
    childProcess.kill("SIGTERM");
  }
  childProcess = spawn("node", ["main.js"], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
}
