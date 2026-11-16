// Q8: Order Processing Flow - Async Retry Mechanism

const MAX_ATTEMPTS = 3;

// Fails 50% of the time
function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Order submitted");
      } else {
        reject(new Error("Server error"));
      }
    }, 500);
  });
}

async function processOrder() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await submitOrder();                      // waits here; rejection jumps to catch
      console.log(`Attempt ${attempt}: Success`);
      return "Order processed successfully";    // stop retrying after the first success
    } catch (error) {
      console.log(`Attempt ${attempt}: Failed`);
    }
  }
  // Loop finished without a return, so every attempt failed
  throw new Error("Order could not be processed");
}

// Handle the final failure gracefully
async function main() {
  try {
    const result = await processOrder();
    console.log(result);
  } catch (error) {
    console.log(`Final result: ${error.message}`);
  }
}

main();
