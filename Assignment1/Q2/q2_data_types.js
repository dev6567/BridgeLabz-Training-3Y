// Q2: Multi-Type Data Summary
const userName = "Aarav";
const userAge = 21;
const isActive = true;
const hobbies = ["reading", "coding"];
const address = { city: "Mathura", state: "UP" };
const middleName = null;
let phoneNumber;                         // undefined

// Helper: typeof gives "object" for arrays and null, so handle those explicitly
function getType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

const entries = [
  ["userName", userName],
  ["userAge", userAge],
  ["isActive", isActive],
  ["hobbies", hobbies],
  ["address", address],
  ["middleName", middleName],
  ["phoneNumber", phoneNumber],
];

// Build rows (label + value + type) and print with ONE console.table()
const report = entries.map(([label, value]) => ({
  Label: label,
  Value: JSON.stringify(value) ?? "undefined",
  Type: getType(value),
}));
console.table(report);
