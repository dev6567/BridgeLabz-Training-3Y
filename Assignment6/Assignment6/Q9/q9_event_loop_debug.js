// Q9: Debugging the Event Loop

// ---- PREDICTION (written before running) ----
// 1. Script start
// 2. Script end
// 3. Promise callback
// 4. Timeout callback

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

// ---- ACTUAL OUTPUT ----
// Script start
// Script end
// Promise callback
// Timeout callback
//
// The prediction matches the actual output.
//
// WHY PROMISES (MICROTASKS) RUN BEFORE setTimeout (MACROTASKS):
// - Synchronous code ("Script start", "Script end") always runs first on the call stack.
// - The Promise callback goes into the microtask queue; the setTimeout callback goes
//   into the macrotask queue.
// - After the call stack is empty, the event loop runs ALL microtasks first.
//   Only after the microtask queue is completely empty does it pick one macrotask.
// - So even with a 0 ms timer, the Promise callback runs first.
