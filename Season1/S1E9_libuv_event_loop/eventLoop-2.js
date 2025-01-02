// ----- EXAMPLE 2 -----
const fs = require("fs");

const b = 100;

setImmediate(() => console.log("set immediate")); // 6

Promise.resolve("promise").then(console.log); // 4

fs.readFile("file.txt", "utf-8", () => {
  console.log("File Read completed");
}); // 7

setTimeout(() => {
  console.log("set timeout expired");
}, 1000); // 5

process.nextTick(() => console.log("process.nextTick")); // 3

function PrintA() {
  console.log("a =", b);
}

PrintA(); // 1
console.log("last line of file"); // 2

/*
----- OUTPUT -----

a = 100
last line of file
process.nextTick
promise
set timeout expired
set immediate
File Read completed
*/
