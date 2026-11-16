// Q7: Banking Application (private fields)

class BankAccount {
  #balance;                      // private field: only code inside this class can access it

  constructor(owner, openingBalance = 0) {
    this.owner = owner;
    this.#balance = openingBalance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Deposit amount must be a positive number.");
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Withdrawal amount must be a positive number.");
    }
    if (amount > this.#balance) {
      throw new Error(`Insufficient balance. Available: ₹${this.#balance}, requested: ₹${amount}`);
    }
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Aarav", 1000);
console.log(`Account of ${account.owner}, opening balance: ₹${account.getBalance()}`);

// Helper that runs an action and prints success or the error message
function tryAction(description, action) {
  try {
    const newBalance = action();
    console.log(`${description} -> OK. Balance: ₹${newBalance}`);
  } catch (error) {
    console.log(`${description} -> FAILED. ${error.message}`);
  }
}

console.log("\n--- Valid deposits ---");
tryAction("Deposit ₹500", () => account.deposit(500));
tryAction("Deposit ₹250", () => account.deposit(250));

console.log("\n--- Withdrawals ---");
tryAction("Withdraw ₹300", () => account.withdraw(300));
tryAction("Withdraw ₹5000", () => account.withdraw(5000));   // insufficient balance
tryAction("Withdraw -100", () => account.withdraw(-100));    // invalid amount
tryAction("Deposit 'abc'", () => account.deposit("abc"));    // invalid amount

console.log(`\nFinal balance: ₹${account.getBalance()}`);

// The private field cannot be reached from outside
// (writing account.#balance outside the class would even be a SyntaxError)
console.log("account.balance  :", account.balance);            // undefined
console.log("account.#balance : not accessible (private)");
console.log("Object.keys     :", Object.keys(account));        // only 'owner'
