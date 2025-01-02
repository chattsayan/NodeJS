const fs = require("fs");

setImmediate(() => console.log("set immediate"));

setTimeout(() => {
  console.log("timer executed");
}, 0);

Promise.resolve("promise").then(console.log);

fs.readFile("file.txt", "utf-8", () => {
  setTimeout(() => {
    console.log("2nd timer executed");
  }, 0);

  process.nextTick(() => console.log("2nd process.nextTick"));

  setImmediate(() => console.log("2nd set immediate"));

  console.log("file read completed");
});

process.nextTick(() => console.log("process.nextTick"));

console.log("last line of code");

/*

last line of code
process.nextTick
promise
timer executed
set immediate

file read completed
2nd process.nextTick
2nd set immediate // this is because event loop is waiting at POLL phase and after poll phase CHECK phase will get executed
2nd timer executed
*/
