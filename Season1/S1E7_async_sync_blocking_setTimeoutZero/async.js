const fs = require("fs");
const https = require("https");

console.log("Learning Node");

var a = 10;
var b = 5;

// ----- ASYNC OPERATION ----- (START)
// V8 engine -> offloads task (API) to Libuv
https.get("https://dummyjson.com/c/3029-d29f-4014-9fb4", (res) => {
  console.log("Data fetched successfully");
});

setTimeout(() => {
  console.log("timeout called after 6s");
}, 6000);

fs.readFile("file.txt", "utf-8", (err, data) => {
  if (!err) {
    console.log(`File Data: ${data}`);
  }
});
// ----- ASYNC OPERATION ----- (END)

function addition(x, y) {
  const result = x + y;
  return result;
}

var c = addition(a, b);
console.log(`Result: ${c}`);

/* 
----- OUTPUT SEQUENCE -----

Learning Node
Result: 15
File Data: i have data stored in me.
Data fetched successfully
timeout called after 6s
*/
