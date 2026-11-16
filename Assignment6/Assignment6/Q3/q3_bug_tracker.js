// Q3: Bug Tracker - Callback to Promise Migration

// ---- Original callback version ----
function fetchBugs(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}

// ---- New Promise version ----
// shouldFail is a boolean that simulates an API failure
function getBugs(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API request failed"));
      } else {
        resolve(["UI glitch", "API timeout", "Login failure"]);
      }
    }, 1000);
  });
}

// Old way (for comparison)
fetchBugs((bugs) => {
  console.log("Callback version received", bugs.length, "bugs");
});

// Randomly decide whether the API fails (about 30% of the time)
const apiShouldFail = Math.random() < 0.3;
console.log(`Simulated API failure: ${apiShouldFail}`);

getBugs(apiShouldFail)
  .then((bugs) => {
    // Turn the strings into objects so console.table shows neat columns
    const bugTable = bugs.map((bug, index) => ({ id: index + 1, bug }));
    console.table(bugTable);
  })
  .catch((error) => {
    console.log(`Failed to load bugs: ${error.message}`);
  });
