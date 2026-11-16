// Q4: DevOps Delay - Promise.all and Promise.race

const FAILURE_CHANCE = 0.15;     // chance that a server fails; set 0 for guaranteed success

// Creates a server that responds after `delay` ms, or fails randomly
function deployToServer(name, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) {
        reject(new Error(`${name} failed`));
      } else {
        console.log(`${name} responded after ${delay / 1000}s`);
        resolve(name);
      }
    }, delay);
  });
}

// Start each server ONCE; Promise.all and Promise.race both watch the same two promises
const serverA = deployToServer("Server A", 2000);   // 2 seconds
const serverB = deployToServer("Server B", 3000);   // 3 seconds

// Promise.all: waits for BOTH servers (rejects as soon as one fails)
Promise.all([serverA, serverB])
  .then((results) => {
    console.log("Deployment completed for all servers:", results.join(", "));
  })
  .catch((error) => {
    console.log(`Promise.all error: ${error.message}`);
  });

// Promise.race: settles with the FIRST server to finish
Promise.race([serverA, serverB])
  .then((winner) => {
    console.log("Fastest response:", winner);
  })
  .catch((error) => {
    console.log(`Promise.race error: ${error.message}`);
  });
