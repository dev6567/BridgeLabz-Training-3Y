// Q1: Callback function flow

// This function is passed as a callback. It runs AFTER the greeting is printed.
function showEndMessage() {
  console.log("Welcome to the course!");
}

// greetUser receives another function (callback) and calls it when its own work is done
function greetUser(name, callback) {
  console.log(`Hello ${name}`);   // step 2: greeting is printed first
  callback();                     // step 3: now the callback is executed
}

console.log("Step 1: calling greetUser");
// Pass the function itself (showEndMessage), NOT its result (showEndMessage())
greetUser("Aarav", showEndMessage);
console.log("Step 4: greetUser finished");
