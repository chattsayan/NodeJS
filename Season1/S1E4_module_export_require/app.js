require("./xyz"); // one module into another

// ----- instead of importing multiple files, importing the grouped file 'index.js' -----
const { calculateSum, z, multiply, substract, divide } = require("./calculate");

// ----- Importing JSON module -----
const data = require("./data.json");

// ----- Inporting multiple files -----
// const divide = require("./calculate/division");
// const multiply = require("./calculate/multiply");
// const substract = require("./calculate/substraction");
// const calculateSum = require("./calculate/sum");

// ----- importing both variable & function by wrapping them inside an object ----- (1)
// const obj = require("./calculate/sum");

// ----- using destrcturing ----- (2)
// const { x, calculateSum } = require("./calculate/sum");

// ----- Importing ESM Modules -----
// import { x, calculateSum } from "./calculate/sum";

var name = "learning node JS";

var a = 20;

var b = 30;

// var x = 500; // if we do not import 'x' from other module then this will be accessed

// console.log(name); // learning node JS
// console.log(a + b); // 50

// ----- WHEN ACCESSING FROM AN OBJECT ----- (1)
// obj.calculateSum(a, b);
// console.log(obj.x);

// ----- WHEN ACCESSING FROM DESTRUCTURE ----- (2)
calculateSum(a, b);
multiply(a, b);
substract(a, b);
divide(a, b);
// console.log(x);
console.log(z);

console.log(data);
