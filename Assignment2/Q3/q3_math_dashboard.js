// Q3: Math Utility Dashboard
const x = 16.75;

const rounded = Math.round(x);                         // nearest integer
const squareRoot = Math.sqrt(x);                       // square root
const cube = Math.pow(x, 3);                           // x raised to power 3
const randomNumber = Math.floor(Math.random() * 41) + 10; // random 10 to 50

// Formatted summary using template literals
console.log(`
===== Math Dashboard =====
Number           : ${x}
Rounded value    : ${rounded}
Square root      : ${squareRoot.toFixed(2)}
Power (x^3)      : ${cube.toFixed(2)}
Random (10-50)   : ${randomNumber}
==========================
`);
