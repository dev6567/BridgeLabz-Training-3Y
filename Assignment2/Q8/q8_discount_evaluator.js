// Q8: Dynamic Discount Evaluator
const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 },
];

// Original cart total, calculated with reduce()
const originalTotal = cart.reduce((sum, product) => sum + product.price, 0);

// Loop through the cart and apply category-wise discount
const discountedItems = [];
for (const product of cart) {
  let discountPercent = 0;
  if (product.category === "electronics") {
    discountPercent = 10;
  } else if (product.category === "fashion") {
    discountPercent = 5;
  }
  const finalPrice = product.price - (product.price * discountPercent) / 100;
  discountedItems.push({ item: product.item, price: product.price, discountPercent, finalPrice });
}

// Total after category discounts, using reduce()
let finalTotal = discountedItems.reduce((sum, p) => sum + p.finalPrice, 0);

// Extra 5% if the ORIGINAL cart value is above 50000
if (originalTotal > 50000) {
  finalTotal -= finalTotal * 0.05;
  console.log("Extra 5% overall discount applied.");
} else {
  console.log("No extra overall discount (cart value is not above 50000).");
}

console.table(discountedItems);
console.log(`Original total: ${originalTotal}`);
console.log(`Final total   : ${finalTotal.toFixed(2)}`);
