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

chokidar
  .watch(["main.js"], {
    ignored: "**/node_modules/**",
  })
  .on("all", (type, fileName) => {
    //     console.log(type, fileName);
    //     console.log("File changes detected");
    if (childProcess) {
      childProcess.kill("SIGTERM");
    }
    childProcess = spawn("node", ["main.js"], {
      stdio: [process.stdin, process.stdout, process.stderr],
    });
  });
