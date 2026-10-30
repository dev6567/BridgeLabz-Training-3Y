// Q2: String Manipulation Report
const productName = "  wireless headphones PRO  ";

// Step 1: remove extra spaces and convert to lowercase
const cleaned = productName.trim().toLowerCase();

// Step 2: replace the whole word "pro" with "Pro Edition"
// (\b makes sure words like "product" are not changed)
const replaced = cleaned.replace(/\bpro\b/, "Pro Edition");

// Step 3: capitalize the first letter of each word
const finalTitle = replaced
  .split(" ")                                              // break into words
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
  .join(" ");                                              // join back into a sentence

console.log(`Original : "${productName}"`);
console.log(`Cleaned  : "${finalTitle}"`);
console.log(`Length   : ${finalTitle.length}`);
