"use strict";
// Q10: Nested Hoisting and Closures

// ---- 1. Original code ----
// PREDICTION: undefined, undefined
//  - outer() has its own hoisted `var count` (undefined until line 2 runs).
//  - inner() has ANOTHER hoisted `var count`, which shadows outer's count.
//    So even after outer sets count = 5, inner still reads its own count = undefined.
function outer() {
  console.log(count);
  var count = 5;
  function inner() {
    console.log(count);
    var count = 10;
  }
  inner();
}
console.log("--- 1. Original code ---");
outer();

// ---- 2. Separate memory contexts ----
// Every function call creates its own execution context with its own variables.
// The two `count` variables are different memory locations.
function outerSeparate() {
  var count = 5;
  function inner() {
    var count = 10;
    console.log(`inner count: ${count}`);
  }
  inner();
  console.log(`outer count after inner(): ${count}`);  // still 5, inner never touched it
}
console.log("\n--- 2. Separate memory contexts ---");
outerSeparate();

// ---- 3. Inner function converted to an arrow function ----
function outerArrow() {
  console.log(count);                    // undefined (outer's hoisted var)
  var count = 5;
  const inner = () => {
    console.log(count);                  // still undefined: arrow has its own var count hoisted
    var count = 10;
  };
  inner();
}
console.log("\n--- 3a. Arrow with its own var count ---");
outerArrow();

// Without its own `var count`, the arrow reads outer's count through the closure
function outerClosure() {
  var count = 5;
  const inner = () => {
    console.log(`inner sees closure count: ${count}`);   // 5
  };
  inner();
}
console.log("--- 3b. Arrow using the outer count (closure) ---");
outerClosure();

// Arrow functions stored in const are NOT hoisted like declarations
function outerArrowEarlyCall() {
  try {
    inner();                              // function declarations would work here; const arrow does not
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
  const inner = () => console.log("inner called");
}
console.log("--- 3c. Calling an arrow before its definition ---");
outerArrowEarlyCall();

// ---- 4. Debug session / call stack ----
// 1. Put a breakpoint on `console.log(count);` inside outer() and press F5.
// 2. Add `count` to Watch: it shows undefined before `var count = 5` runs.
// 3. Step Into (F11) the call to inner(): the CALL STACK now shows
//        inner
//        outer
//        (anonymous) / main module
//    The stack grows when a function is called and shrinks when it returns.
// 4. Watch shows inner's own `count`: undefined, then 10 after its assignment.
// 5. Step out (Shift+F11): the stack drops back to outer, whose count is still 5.
