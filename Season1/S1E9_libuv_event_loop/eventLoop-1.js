const fs = require("fs");

// ----- EXAMPLE 1 -----
var a = 10;

setImmediate(() => console.log("set Immediate")); // 4

fs.readFile("file.txt", "utf-8", () => {
  console.log("File Read completed");
}); // 5

setTimeout(() => {
  console.log("set timeout");
}, 0); // 3

function PrintA() {
  console.log("a =", a);
}

PrintA(); // 1
console.log("last line of file"); // 2

/*
----- OUTPUT -----

a = 10
last line of file
set timeout
set Immediate
File Read completed
*/
