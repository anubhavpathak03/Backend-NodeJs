// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function defaultFn() {
  console.log("Hey I am default");
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  defaultFn   // default jaisa function bhi saath bhej diya
};
