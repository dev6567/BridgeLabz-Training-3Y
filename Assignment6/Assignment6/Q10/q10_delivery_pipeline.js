// Q10: The Final Delivery - Async Pipeline Debugger

const FAILURE_CHANCE = 0.1;      // chance each step fails; set 0 for a guaranteed success

// Random delay between 1 and 2 seconds
const randomDelay = () => 1000 + Math.floor(Math.random() * 1001);

// Generic step: returns a Promise that resolves with a message or rejects randomly.
// The Promise is created immediately, but its result arrives LATER. While the
// timer waits, the JavaScript thread is free (it is not blocked).
function createStep(stepName, successMessage) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) {
        reject(new Error(`${stepName} failed`));
      } else {
        resolve(successMessage);
      }
    }, randomDelay());
  });
}

const takeOrder = () => createStep("Take order", "Step 1: Order taken");
const prepare = () => createStep("Prepare food", "Step 2: Food prepared");
const pack = () => createStep("Pack order", "Step 3: Package ready");
const dispatch = () => createStep("Dispatch", "Step 4: Out for delivery");
const deliver = () => createStep("Deliver", "Delivery completed!");

async function runPipeline() {
  console.log("Start Pipeline");
  try {
    // EVENT LOOP FLOW for each `await`:
    // 1. The function runs until it hits `await` and the function is paused.
    // 2. Control returns to the event loop, so other code can run.
    // 3. When the timer fires and the promise settles, the continuation is put in the
    //    MICROTASK queue and the function resumes from where it stopped.
    // 4. If the promise rejected, `await` throws, and control jumps to the catch block.
    console.log(await takeOrder());
    console.log(await prepare());
    console.log(await pack());
    console.log(await dispatch());
    console.log(await deliver());
  } catch (error) {
    // Any failed step skips the remaining steps
    console.log("Pipeline failed!");
    console.log(`Reason: ${error.message}`);
  }
}

runPipeline();
console.log("(This line runs immediately: runPipeline() paused at its first await)");
