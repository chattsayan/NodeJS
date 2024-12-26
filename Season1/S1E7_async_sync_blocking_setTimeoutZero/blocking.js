const crypto = require("crypto");

console.log("hello world");

var a = 500;
var b = 25;

// ** never use sync operation as this will block the main thread
// SYNC/ Blocking I/o OPERATION
// this is not offloaded to libuv
// 50000000 - the more the no. of iterations, the more time it will take to execute
crypto.pbkdf2Sync("pass", "salt", 50000000, 25, "sha512");
console.log("first key is generated");

// ----- AYNCS/ NON-BLOCKING I/O task -----
// this is offloaded to libuv
// password base key derivative function (pbkdf)
// digest(which algorithm you want to use) = sha512
crypto.pbkdf2("pass", "salt", 200000, 25, "sha512", (err, key) => {
  console.log("second key is generated");
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);
console.log(c);

/*
----- OUTPUT SEQUENCE -----

hello world
first key is generated // this blocks the main thread, we need to avoid sync operation as much needed
12500
second key is generated
*/
