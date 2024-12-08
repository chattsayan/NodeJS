console.log("I am calculating sum");

var x = "exporting vaiable";

function calculateSum(a, b) {
  console.log("Sum:", a + b);
}

/*
// ----- ES MODULES (ESM) -----

export var x = "exporting vaiable";

export function calculateSum(a, b) {
  console.log(a + b);
*/

// ----- COMMON JS MODULES -----
// module.exports = calculateSum; // when we are using a single variable/function
// module.exports = { x, calculateSum }; // we can export both variable & function by wrapping them inside an object
module.exports = calculateSum;
