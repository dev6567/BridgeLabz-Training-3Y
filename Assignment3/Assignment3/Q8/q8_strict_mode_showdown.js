// Q8: Strict Mode Showdown
// NOTE: there is intentionally NO "use strict" at the top of this file. Strict mode turns
// some mistakes into SyntaxErrors at parse time, which would stop the whole file from
// running. So the strict versions are tested with the Function constructor inside try...catch.

function report(label, fn) {
  try {
    const result = fn();
    console.log(`${label} -> OK ${result !== undefined ? JSON.stringify(result) : ""}`);
  } catch (error) {
    console.log(`${label} -> ${error.name}: ${error.message}`);
  }
}

// ---- 1. Original code WITHOUT strict mode ----
console.log("--- Without strict mode ---");
report("sloppy demo(5, 10)", () => {
  function demo(a, a) {           // duplicate parameter names are allowed; last 'a' wins
    total = 10;                   // no declaration, so a GLOBAL variable is silently created
    const deleted = delete total; // deleting that global works
    return { a, deleted };
  }
  return demo(5, 10);            // a is 10, the first 5 is lost
});

// ---- 2. Original code WITH strict mode: each rule broken separately ----
console.log("\n--- With strict mode ---");
// Error 1: duplicate parameter names (caught when the function is created)
report('strict: function demo(a, a)', () =>
  new Function('"use strict"; function demo(a, a) {} return demo;')());

// Error 2: assignment to an undeclared variable
report("strict: total = 10 (undeclared)", () =>
  new Function('"use strict"; function demo() { total = 10; } demo();')());

// Error 3: deleting a variable (unqualified identifier)
report("strict: delete total", () =>
  new Function('"use strict"; var total = 10; delete total;')());

// ---- 3. Why strict mode makes these illegal ----
// - Duplicate parameters: ambiguous, and almost always a typo; one value is silently lost.
// - Undeclared assignment: typos create accidental globals that pollute the global scope.
// - delete on a variable: variables are not meant to be removed; only object properties can be.
// Strict mode converts silent bugs into loud errors, so they are caught early.

// ---- 4. Correct ES6 version ----
function demoFixed(first, second) {
  "use strict";                     // simple parameter list, so a function-level directive is allowed
  let total = first + second;       // properly declared and local
  const record = { total };         // use an object if a removable property is needed
  delete record.total;              // deleting an object property is legal
  return { total, recordAfterDelete: record };
}
console.log("\n--- Correct ES6 version ---");
console.log(demoFixed(5, 10));
