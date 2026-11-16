// Q2: Higher-order function with callbacks

// Takes an array and a callback; applies the callback to every number
// and returns a NEW array (the original array is not changed).
function applyOperation(numbers, operation) {
  const result = [];
  for (const number of numbers) {
    result.push(operation(number));
  }
  return result;
}

// Callback functions
const double = (num) => num * 2;
const square = (num) => num * num;

const numbers = [1, 2, 3, 4];
console.log("Original array:", numbers);
console.log("Doubled       :", applyOperation(numbers, double));   // [2, 4, 6, 8]
console.log("Squared       :", applyOperation(numbers, square));   // [1, 4, 9, 16]
console.log("Original again:", numbers);                           // unchanged
