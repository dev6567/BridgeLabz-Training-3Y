"use strict";
// Q7: Smart Calculator

// Custom error classes
class DivideByZeroError extends Error {
  constructor(message) { super(message); this.name = "DivideByZeroError"; }
}
class NegativeRootError extends Error {
  constructor(message) { super(message); this.name = "NegativeRootError"; }
}
class InvalidOperationError extends Error {
  constructor(message) { super(message); this.name = "InvalidOperationError"; }
}

function calculate(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError("Cannot divide by zero");
      return a / b;
    case "power":
      return Math.pow(a, b);
    case "root":
      // square root of the first number
      if (a < 0) throw new NegativeRootError(`Cannot take the root of a negative number (${a})`);
      return Math.sqrt(a);
    default:
      throw new InvalidOperationError(`Unknown operation: "${operation}"`);
  }
}

function runAll(operations, num1, num2) {
  const summary = [];
  for (const operation of operations) {
    try {
      const result = calculate(operation, num1, num2);
      summary.push({ operation, num1, num2, result, status: "OK" });
    } catch (error) {
      summary.push({ operation, num1, num2, result: "-", status: `${error.name}: ${error.message}` });
    }
  }
  console.table(summary);
}

// Main data from the question
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;
console.log("--- Main run (25, 0) ---");
runAll(operations, num1, num2);

// Extra runs to demonstrate the remaining errors
console.log("--- Negative root and invalid operation ---");
runAll(["root", "modulus"], -16, 2);
