const math = require('./math');
console.log(math)
// console.log(Math.add(5,6));

// we destructure above line-1 as:-
const {add, sub, mul, div} = require('./math');
console.log(add(5, 6));

console.log(math.add(5, 6));     // 11
math.defaultFn();         