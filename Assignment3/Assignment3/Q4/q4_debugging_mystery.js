"use strict";
// Q4: Debugging Mystery

// ---- PART 1: the buggy code ----
function showMessageBuggy() {
  greeting = "Welcome";      // undeclared variable
  console.log(greeting);
}

console.log("--- Buggy version ---");
try {
  showMessageBuggy();
} catch (error) {
  // Why it fails: in strict mode, assigning to a variable that was never declared
  // throws a ReferenceError. In sloppy mode JavaScript silently creates a GLOBAL
  // variable instead, which hides typos and leaks data.
  console.log(`${error.name}: ${error.message}`);
}

// For comparison: the same code in sloppy mode (Function constructor bodies are not strict)
const sloppyVersion = new Function('greeting = "Welcome"; return greeting;');
console.log(`Sloppy mode result: ${sloppyVersion()} (and now globalThis.greeting = ${globalThis.greeting})`);
delete globalThis.greeting;  // clean up the leaked global

// ---- PART 2: the fix ----
function showMessageFixed() {
  const greeting = "Welcome";   // declared with const, so it lives only inside this function (local scope)
  console.log(greeting);
}
console.log("--- Fixed version ---");
showMessageFixed();
console.log(`typeof greeting outside function: ${typeof greeting}`); // undefined, no leak

// ---- PART 3: debugger practice ----
// 1. Set a breakpoint on the line `debugger;` below (or click left of a line number).
// 2. Press F5 in VS Code (Run and Debug -> Node.js).
// 3. In the WATCH panel add: greeting
// 4. In the CALL STACK panel you will see: showMessageWithDebug -> (anonymous/main module)
// 5. Use Step Over (F10) / Step Into (F11) and watch greeting get its value.
function showMessageWithDebug() {
  const greeting = "Welcome";
  debugger;                      // pauses here only when a debugger is attached
  console.log(greeting);
}
console.log("--- Debug version ---");
showMessageWithDebug();
