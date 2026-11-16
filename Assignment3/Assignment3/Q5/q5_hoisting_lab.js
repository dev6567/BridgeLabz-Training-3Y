"use strict";
// Q5: Hoisting Lab - The Sequence Trap
// Each section is wrapped in a function so names do not clash.

// ---- 1. Original code, run exactly as given ----
function originalCode() {
  console.log(score);            // PREDICT: undefined (var is hoisted, value not yet assigned)
  announce();                    // PREDICT: "Game started" (function declarations are fully hoisted)
  var score = 50;
  function announce() { console.log("Game started"); }
  let status = "ready";
  startGame();                   // works, because status is already initialised before this call
  function startGame() {
    console.log(status);
  }
}
console.log("--- 1. Original code ---");
originalCode();

// ---- 2. Memory state of each hoisted element before its own line runs ----
console.log("\n--- 2. Hoisting memory states ---");
console.table([
  { element: "score",     kind: "var",                  stateBeforeLine: "undefined (declared + initialised to undefined)" },
  { element: "announce",  kind: "function declaration", stateBeforeLine: "fully available (whole function stored)" },
  { element: "status",    kind: "let",                  stateBeforeLine: "hoisted but in Temporal Dead Zone (ReferenceError if read)" },
  { element: "startGame", kind: "function declaration", stateBeforeLine: "fully available (whole function stored)" },
]);

// Proof of the Temporal Dead Zone for let
function tdzDemo() {
  try {
    console.log(statusTdz);      // let variable read before its declaration
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
  let statusTdz = "ready";
}
tdzDemo();

// ---- 3. Fixed version: declare first, use after ----
function fixedCode() {
  const score = 50;              // now prints 50, not undefined
  const status = "ready";
  function announce() { console.log("Game started"); }
  function startGame() { console.log(status); }

  console.log(score);
  announce();
  startGame();
}
console.log("\n--- 3. Fixed code ---");
fixedCode();

// ---- 4. Arrow function version: hoisting differences ----
function arrowDemo() {
  // var + arrow: the VARIABLE is hoisted as undefined, but the function is not assigned yet
  try {
    announceVar();
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
  var announceVar = () => console.log("Game started (var arrow)");

  // const + arrow: variable is in the Temporal Dead Zone
  try {
    announceConst();
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
  const announceConst = () => console.log("Game started (const arrow)");

  // After the definitions, both work
  announceVar();
  announceConst();
}
console.log("\n--- 4. Arrow functions ---");
arrowDemo();
