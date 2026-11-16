"use strict";
// Q1: Dynamic Data Parser
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// Helper to print any value clearly (JSON.stringify(undefined) returns undefined)
const show = (v) => (v === undefined ? "undefined" : JSON.stringify(v));

// Valid number check.
// Debug observation: Number(" ") is 0 and Number(null) is 0, which would look
// "valid", so blank strings, null and undefined are rejected explicitly first.
function isValidNumber(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return Number.isFinite(Number(value));
}

// Explains why a value was rejected
function getInvalidReason(value) {
  if (value === null || value === undefined) return "missing value (null/undefined)";
  if (typeof value === "string" && value.trim() === "") return "blank string (Number() would wrongly give 0)";
  return "not numeric (Number() gives NaN)";
}

const validNumbers = [];     // clean numeric data
const invalidEntries = [];   // rejected entries with reasons

console.log("===== Conversion Report =====");
for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];

  // Three conversion forms of the same value
  const asNumber = Number(raw);
  const asBoolean = Boolean(raw);   // note: Boolean("false") is true (non-empty string)
  const asString = String(raw);

  // Conditional formatting: tag each row as VALID or SKIPPED
  if (isValidNumber(raw)) {
    validNumbers.push(asNumber);
    console.log(`[VALID  ] #${i} raw=${show(raw)} | Number=${asNumber} | Boolean=${asBoolean} | String=${show(asString)}`);
  } else {
    invalidEntries.push({ index: i, raw: show(raw), reason: getInvalidReason(raw) });
    console.log(`[SKIPPED] #${i} raw=${show(raw)} | Number=${asNumber} | Boolean=${asBoolean} | String=${show(asString)}`);
  }
}

console.log("\n===== Valid Numeric Data =====");
console.log(validNumbers);
const sum = validNumbers.reduce((total, n) => total + n, 0);
console.log(`Count: ${validNumbers.length}, Sum: ${sum.toFixed(2)}`);

console.log("\n===== Invalid Entries (logged separately) =====");
for (const entry of invalidEntries) {
  console.log(`#${entry.index} ${entry.raw} -> ${entry.reason}`);
}
console.log(`Total invalid: ${invalidEntries.length} of ${apiData.length}`);
