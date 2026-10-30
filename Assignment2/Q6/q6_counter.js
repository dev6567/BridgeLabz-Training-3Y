// Q6: Event-Based Counter Simulation
let count = 0;   // shared by all functions below

function increment() {
  // Nested function: can read and update count from the outer scope
  function updateAndLog(change) {
    count += change;
    console.log(`Count is now: ${count}`);
  }
  updateAndLog(1);
}

function decrement() {
  function updateAndLog(change) {
    count += change;
    console.log(`Count is now: ${count}`);
  }
  updateAndLog(-1);
}

// Simulate button clicks by calling the functions manually
console.log("Click: +");
increment();
console.log("Click: +");
increment();
console.log("Click: +");
increment();
console.log("Click: -");
decrement();
console.log(`Final count: ${count}`);
