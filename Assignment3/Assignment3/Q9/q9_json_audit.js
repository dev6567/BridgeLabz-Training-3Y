"use strict";
// Q9: JSON Audit
const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
];

// Extra entry added only to demonstrate the under-18 filter (bonus task)
const auditInput = [...rawData, '{"user":"Tom","age":16}'];

const cleanData = [];     // valid, parsed entries
const errorLog = [];      // messages with line numbers
const requiredKeys = ["user", "age"];

for (let i = 0; i < auditInput.length; i++) {
  const lineNumber = i + 1;

  // DEBUG: set a breakpoint here and step with F10/F11. For '{invalid}', JSON.parse throws,
  // control jumps straight to the catch block and the code after JSON.parse is skipped.
  debugger;

  try {
    const parsed = JSON.parse(auditInput[i]);     // throws SyntaxError on bad JSON

    // Detect missing keys
    const missingKeys = requiredKeys.filter((key) => !(key in parsed));
    if (missingKeys.length > 0) {
      throw new Error(`Missing key(s): ${missingKeys.join(", ")}`);
    }

    // Bonus: convert age to a Number and make sure it is valid
    const age = Number(parsed.age);
    if (Number.isNaN(age)) {
      throw new Error(`Age is not a number: ${JSON.stringify(parsed.age)}`);
    }

    cleanData.push({ user: parsed.user, age });
  } catch (error) {
    const type = error instanceof SyntaxError ? "Invalid JSON" : "Validation error";
    errorLog.push(`Line ${lineNumber}: ${type} - ${error.message}`);
  }
}

console.log("===== Clean Data =====");
console.log(cleanData);

console.log("\n===== Error Log =====");
errorLog.forEach((entry) => console.log(entry));

// Bonus: filter out users under 18
const adults = cleanData.filter((person) => person.age >= 18);
const minors = cleanData.filter((person) => person.age < 18);
console.log("\n===== Bonus: Age Filter =====");
console.log("Adults (18+):", adults);
console.log("Removed (under 18):", minors);
