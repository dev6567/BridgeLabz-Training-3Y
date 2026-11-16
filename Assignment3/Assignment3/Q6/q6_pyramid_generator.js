"use strict";
// Q6: Pyramid Pattern Generator
// Optional input: node q6_pyramid_generator.js 7   (default = 5)

// Read the limit from command-line input; fall back to 5 for missing/invalid input
const userInput = typeof process !== "undefined" ? process.argv[2] : undefined;
let limit = userInput !== undefined ? Number(userInput) : 5;
if (!Number.isInteger(limit) || limit < 1) {
  limit = 5;
}

// ---- Version 1: let (block scoped) ----
function pyramidWithLet(rows) {
  for (let row = 1; row <= rows; row++) {
    let line = "";
    for (let col = 1; col <= row; col++) {
      line += "* ";
    }
    console.log(line.trimEnd());
  }
  // row, col and line do not exist here
  console.log(`After loop (let): typeof row = ${typeof row}`);
}

// ---- Version 2: var (function scoped) ----
function pyramidWithVar(rows) {
  for (var row = 1; row <= rows; row++) {
    var line = "";
    for (var col = 1; col <= row; col++) {
      line += "* ";
    }
    console.log(line.trimEnd());
  }
  // Observation: var leaks out of the loops, and keeps the last value
  console.log(`After loop (var): row = ${row}, col = ${col}`);
}

console.log(`Pyramid with limit = ${limit}`);
console.log("--- let version ---");
pyramidWithLet(limit);
console.log("--- var version ---");
pyramidWithVar(limit);

// ---- Variable re-use: the classic closure trap ----
const withVar = [];
const withLet = [];
for (var i = 1; i <= 3; i++) { withVar.push(() => i); }   // all share ONE i
for (let j = 1; j <= 3; j++) { withLet.push(() => j); }   // each iteration gets its OWN j
console.log("var closures:", withVar.map((fn) => fn()));  // [4, 4, 4]
console.log("let closures:", withLet.map((fn) => fn()));  // [1, 2, 3]

// ---- Strict mode catches an undeclared loop variable ----
try {
  for (k = 1; k <= 3; k++) { /* k was never declared */ }
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// DEBUG STEPS (VS Code): put a breakpoint on `line += "* ";`, add row, col and line to
// the Watch panel, then press F10 repeatedly. col restarts at 1 for every row, while
// row only moves forward. With var, the same variables survive after the loop ends.
