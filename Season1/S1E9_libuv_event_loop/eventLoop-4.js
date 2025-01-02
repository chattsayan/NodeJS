const fs = require("fs");

setImmediate(() => console.log("set immediate"));

setTimeout(() => {
  console.log("timer");
}, 0);

Promise.resolve("promise").then(console.log);

fs.readFile("file.txt", "utf-8", () => console.log("file read success"));

process.nextTick(() => {
  // for nested nextTick it will execute the next ticks first as it is at highest priority
  process.nextTick(() => {
    process.nextTick(() => console.log("innermost nextTick"));
    console.log("inner nextTick");
  });
  console.log("nextTick");
});

console.log("last line of code");

/**
 * ----- OUTPUT -----
 *
 * last line of code
 * nextTick
 * inner nextTick
 * innermost nextTick
 * promise
 * timer
 * set immediate
 * file read success
 */
