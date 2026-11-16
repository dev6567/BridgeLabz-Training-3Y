// Q2: Task Scheduler - Micro vs Macro Challenge

console.log("Start");                                   // 1. synchronous

setTimeout(() => {
  console.log("setTimeout callback (macrotask)");       // 5. runs last
}, 0);

Promise.resolve().then(() => {
  console.log("Promise.then callback (microtask)");     // 4. runs right after the sync code
});

console.log("Synchronous log");                         // 2. synchronous

console.log("End");                                     // 3. synchronous

// Output order:
// Start
// Synchronous log
// End
// Promise.then callback (microtask)
// setTimeout callback (macrotask)
//
// WHY MICROTASKS RUN BEFORE MACROTASKS:
// 1. JavaScript first runs all the synchronous code on the call stack
//    (Start, Synchronous log, End).
// 2. setTimeout hands its callback to the Web API/timer, which puts it into the
//    MACROTASK (callback) queue after the delay, even if the delay is 0 ms.
// 3. Promise.then puts its callback into the MICROTASK queue.
// 4. When the call stack becomes empty, the event loop ALWAYS empties the whole
//    microtask queue first. Only then does it take ONE task from the macrotask queue.
// 5. So the promise callback runs before the timeout callback, even though the
//    setTimeout line was written earlier.
