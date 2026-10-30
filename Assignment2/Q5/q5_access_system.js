// Q5: Boolean Logic Access System

// Checks all conditions; access is granted only if every one is satisfied
function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Door and window must both be secured
  const entryPointsSecure = isDoorLocked && isWindowClosed;

  // Any open entry point is a breach risk (uses ! and ||)
  const hasBreachRisk = !isDoorLocked || !isWindowClosed;

  if (isAlarmOn && entryPointsSecure && isOwnerInside && !hasBreachRisk) {
    return "Secure";
  }
  return "Unsafe";
}

// Test multiple outcomes: [door, window, alarm, owner]
const testCases = [
  [true, true, true, true],     // everything ok
  [false, true, true, true],    // door not locked
  [true, false, true, true],    // window open
  [true, true, false, true],    // alarm off
  [true, true, true, false],    // owner not inside
];

testCases.forEach((c, i) => {
  console.log(
    `Test ${i + 1}: door=${c[0]}, window=${c[1]}, alarm=${c[2]}, owner=${c[3]} -> ${checkSecurity(...c)}`
  );
});
