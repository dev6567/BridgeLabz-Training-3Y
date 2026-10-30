// Q4: Array Performance Analyzer

// Create 8 random scores between 30 and 100 (inclusive)
const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

const highest = Math.max(...scores);
const lowest = Math.min(...scores);

// reduce() adds up all scores, then divide by count for the average
const total = scores.reduce((sum, score) => sum + score, 0);
const average = total / scores.length;

// filter() keeps only the passing scores (>= 50)
const passedScores = scores.filter((score) => score >= 50);

// map() builds a pass/fail label for each score
const results = scores.map((score) => (score >= 50 ? "Pass" : "Fail"));

console.log("===== Performance Summary =====");
console.log(`Scores         : ${scores.join(", ")}`);
console.log(`Results        : ${results.join(", ")}`);
console.log(`Highest score  : ${highest}`);
console.log(`Lowest score   : ${lowest}`);
console.log(`Average score  : ${average.toFixed(2)}`);
console.log(`Students passed: ${passedScores.length} out of ${scores.length}`);
