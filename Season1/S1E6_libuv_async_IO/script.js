const fs = require("fs");

var a = 1554723;
var b = 56515;

// https.get("https://api.fbi.com", (res) => {
//   console.log(res?.scecret);
// });

setTimeout(() => {
  console.log("timer is out");
}, 5000);

fs.readFile("gossip.txt", "utf-8", (err, data) => {
  console.log("File Data:", data);
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);
console.log(c);
