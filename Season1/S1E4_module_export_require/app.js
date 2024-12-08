// ----- instead of importing multiple files, importing the grouped file 'index.js' -----
const { calculateSum, multiply, substract, divide } = require("./calculate");

// ----- Importing JSON module -----
const data = require("./data.json");

require("./xyz"); // one module into another

// ----- Inporting multiple files -----
// const divide = require("./calculate/division");
// const multiply = require("./calculate/multiply");
// const substract = require("./calculate/substraction");
// const calculateSum = require("./calculate/sum");

// ----- importing both variable & function by wrapping them inside an object -----
// const obj = require("./sum");

// ----- using destrcturing -----
// const { x, calculateSum } = require("./calculate/sum");

// ----- Importing ESM Modules -----
// import { x, calculateSum } from "./sum";

var name = "learning node JS";

var a = 20;

var b = 30;

// var x = 500; // if we do not import 'x' from other module then this will be accessed

// console.log(name); // learning node JS
// console.log(a + b); // 50

// ----- WHEN ACCESSING FROM AN OBJECT -----
// obj.calculateSum(a, b);
// console.log(obj.x);

// ----- WHEN ACCESSING FROM DESTRUCTURE -----
calculateSum(a, b);
multiply(a, b);
substract(a, b);
divide(a, b);
// console.log(x);

console.log(data);
