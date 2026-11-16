// Q1: The Startup Morning - Async Coffee Maker (Promise chaining)

// Chance (0 to 1) that any step fails. Change to 0 for a guaranteed success.
const FAILURE_CHANCE = 0.2;

// Random delay between 1000 ms and 2000 ms
const randomDelay = () => 1000 + Math.floor(Math.random() * 1001);

// Generic async step: resolves after 1-2 s, or rejects randomly
function runStep(stepName, successMessage) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) {
        reject(new Error(`${stepName} failed`));      // simulated random failure
      } else {
        resolve(successMessage);
      }
    }, delay);
  });
}

const boilWater = () => runStep("Boiling water", "Water boiled");
const brewCoffee = () => runStep("Brewing coffee", "Coffee brewed");
const pourIntoCup = () => runStep("Pouring coffee", "Coffee poured into cup");

console.log("Starting the coffee process...");

// Promise chain: each .then() starts only after the previous promise resolves
boilWater()
  .then((message) => {
    console.log(`Step 1: ${message}`);
    return brewCoffee();            // returning a promise makes the chain wait for it
  })
  .then((message) => {
    console.log(`Step 2: ${message}`);
    return pourIntoCup();
  })
  .then((message) => {
    console.log(`Step 3: ${message}`);
    console.log("Coffee ready for the team!");
  })
  .catch((error) => {
    // Any rejection in the chain skips the remaining .then() calls and lands here
    console.log(`Coffee process failed: ${error.message}`);
  });
