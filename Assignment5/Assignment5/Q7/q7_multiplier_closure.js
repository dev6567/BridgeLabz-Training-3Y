// Q7: Closure with makeMultiplier

function makeMultiplier(multiplier) {
  // The inner function is returned. It "remembers" the variable `multiplier`
  // from the outer function even after makeMultiplier has finished running.
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(triple(5));    // 15
console.log(double(5));    // 10
console.log(triple(10));   // 30

// EXPLANATION:
// 1. makeMultiplier(3) runs and creates a variable multiplier = 3 in its own scope.
// 2. It returns the inner function. Normally multiplier would be removed after the
//    function ends, but the inner function still uses it.
// 3. JavaScript keeps that variable alive for the inner function. This combination of
//    a function plus the variables around it is called a closure.
// 4. Every call to makeMultiplier creates a NEW scope, so double and triple keep their
//    own separate multiplier values (2 and 3) and do not affect each other.
