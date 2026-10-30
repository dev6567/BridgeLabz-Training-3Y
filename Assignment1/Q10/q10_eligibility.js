// Q10: Citizen Eligibility Validator
// Note: the brief overlaps ("all services" for citizen >= 18 vs "vote only" for 18-20).
// Resolved by treating "all services" as citizen AND age >= 21 (driving/passport age).
const age = 19;
const isCitizen = true;

if (isCitizen) {
  if (age >= 21) {
    console.log("Eligible for all services.");
  } else if (age >= 18) {
    console.log("Eligible to vote only.");     // citizen aged 18-20
  } else {
    console.log("Not eligible yet.");
  }
} else {
  if (age >= 18) {
    console.log("Only age criteria met.");
  } else {
    console.log("Not eligible yet.");
  }
}
