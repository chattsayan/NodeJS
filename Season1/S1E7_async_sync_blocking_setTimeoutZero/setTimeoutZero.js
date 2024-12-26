console.log("hello world");

var a = 15;
var b = 6;

// this callback will only be pushed to call stack in v8 once the call stack is empty
setTimeout(() => {
  console.log("call me right now");
}, 0); // trust issue with setTimeout

setTimeout(() => {
  console.log("call me after 3 sec");
}, 3000);

function substract(x, y) {
  let result;
  if (x > y) {
    result = x - y;
  } else {
    result = y - x;
  }

  return result;
}

var c = substract(a, b);
console.log(c);

/*
----- OUTPUT SEQUENCE -----

hello world
9
call me right now // though this is an async function, this gets executed immediately as soon as call stack is empty
call me after 3 sec
*/
