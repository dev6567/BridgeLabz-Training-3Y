// Q5: Frontend Rush - Avoiding Callback Hell
// Pipeline: design -> build -> test -> deploy -> celebrate (1 second each)

// ================== Part 1: Callback hell ==================
function stageWithCallback(name, callback) {
  setTimeout(() => {
    console.log(`  ${name} done`);
    callback();
  }, 1000);
}

function runWithCallbacks(onFinish) {
  console.log("Callback version started");
  stageWithCallback("Design", () => {
    stageWithCallback("Build", () => {
      stageWithCallback("Test", () => {
        stageWithCallback("Deploy", () => {
          stageWithCallback("Celebrate", () => {
            // The code keeps moving to the right: this is the "pyramid of doom"
            console.log("Callback version finished");
            onFinish();
          });
        });
      });
    });
  });
}

// ================== Part 2: async/await ==================
function stageWithPromise(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  ${name} done`);
      resolve();
    }, 1000);
  });
}

async function runWithAsyncAwait() {
  console.log("async/await version started");
  await stageWithPromise("Design");
  await stageWithPromise("Build");
  await stageWithPromise("Test");
  await stageWithPromise("Deploy");
  await stageWithPromise("Celebrate");
  console.log("async/await version finished");
}

// Run the callback version first, then the async/await version
runWithCallbacks(() => {
  runWithAsyncAwait();
});

// WHY async/await IMPROVES READABILITY:
// - The code reads top to bottom like normal synchronous code, with no nesting.
// - Adding, removing or reordering a stage is just adding/removing one line.
// - Error handling needs one try/catch around everything, instead of checking errors in every callback.
// - Each stage is a separate function that returns a promise, so it can be reused and tested alone.
