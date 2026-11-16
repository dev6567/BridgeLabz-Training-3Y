"use strict";
// Q3: Transaction Validator

// Custom error types so each failure can be categorized
class NullTransactionError extends Error {
  constructor(message) { super(message); this.name = "NullTransactionError"; }
}
class MissingFieldError extends Error {
  constructor(message) { super(message); this.name = "MissingFieldError"; }
}
class NegativeAmountError extends Error {
  constructor(message) { super(message); this.name = "NegativeAmountError"; }
}

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null,
];

function validateTransaction(transaction) {
  if (transaction === null) {
    throw new NullTransactionError("Transaction entry is null");
  }
  if (transaction.id === undefined || transaction.amount === undefined) {
    throw new MissingFieldError(`Transaction is missing id or amount: ${JSON.stringify(transaction)}`);
  }
  if (transaction.amount < 0) {
    throw new NegativeAmountError(`Transaction ${transaction.id} has negative amount ${transaction.amount}`);
  }
  return true;
}

const valid = [];
const invalid = [];
const errorTypeCounts = {};

for (let i = 0; i < transactions.length; i++) {
  const transaction = transactions[i];

  // BREAKPOINT: with the VS Code debugger attached, execution pauses here.
  // Watch: i, transaction, valid.length, invalid.length. (Ignored when run normally.)
  debugger;

  try {
    validateTransaction(transaction);
    valid.push(transaction);
  } catch (error) {
    // Categorize by error type
    invalid.push({ transaction, errorType: error.name, message: error.message });
    errorTypeCounts[error.name] = (errorTypeCounts[error.name] || 0) + 1;
  }
}

console.log("===== Valid Transactions =====");
console.log(valid);
console.log("\n===== Invalid Transactions =====");
for (const item of invalid) {
  console.log(`[${item.errorType}] ${item.message}`);
}
console.log("\n===== Final Report =====");
console.log(`Total     : ${transactions.length}`);
console.log(`Successful: ${valid.length}`);
console.log(`Failed    : ${invalid.length}`);
console.log("Errors by type:", errorTypeCounts);
