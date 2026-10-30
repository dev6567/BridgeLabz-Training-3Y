// Q7: Customer Feedback Processor
const feedback = "Great product! Fast delivery and amazing sound quality!";

// Count words: trim, then split on one or more spaces
const wordCount = feedback.trim().split(/\s+/).length;

// Convert to lowercase so "Bad" and "bad" are both detected
const lowerFeedback = feedback.toLowerCase();
const hasNegativeWords = lowerFeedback.includes("bad") || lowerFeedback.includes("poor");

console.log(`Feedback  : "${feedback}"`);
console.log(`Word count: ${wordCount}`);

if (!hasNegativeWords) {
  console.log("Positive Feedback");
} else {
  console.log("Needs Improvement");
}
