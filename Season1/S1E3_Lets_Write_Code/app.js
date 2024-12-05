var name = "learning node JS";

var a = 20;

var b = 30;

console.log(name); // learning node JS
console.log(a + b); // 50

console.log(global); // global object
console.log(this); // {} object
console.log(globalThis === global); // true

/*
in JS both 'window' and 'this' were global objects and this points at window, ie, this === window

But, in node 'this' is and empty object, and 'global' is a global object in node terminal but not in browser and will throw ReferenceError

'globalThis' is a global object both in browser and node terminal
*/
