// Q7: Smart Guessing Game
const secret = Math.floor(Math.random() * 50) + 1; // 1 to 50
const userGuess = 25;                              // test value

console.log(`(Secret number: ${secret}, your guess: ${userGuess})`);

if (userGuess === secret) {
  console.log("Correct guess!");
} else {
  // Not exact: check closeness using absolute difference
  if (Math.abs(userGuess - secret) <= 3) {
    console.log("Very close!");
  } else if (userGuess > secret) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
}
