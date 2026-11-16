// Q3: Product Discount System (constructor function + prototype)

function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Shared method on the prototype. It RETURNS the new price and does not change the product.
Product.prototype.applyDiscount = function (percent) {
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    throw new RangeError("Discount must be a number between 0 and 100");
  }
  return this.price - (this.price * percent) / 100;
};

const laptop = new Product("Laptop", 50000);
const headphones = new Product("Headphones", 2000);
const shoes = new Product("Shoes", 3500);

console.log(`${laptop.name}: ₹${laptop.price} -> ₹${laptop.applyDiscount(10)} after 10% off`);
console.log(`${headphones.name}: ₹${headphones.price} -> ₹${headphones.applyDiscount(25)} after 25% off`);
console.log(`${shoes.name}: ₹${shoes.price} -> ₹${shoes.applyDiscount(40)} after 40% off`);

// ABSTRACTION:
// The code below only says WHAT it wants ("apply a discount"). It does not know or care
// HOW the discount is calculated. If the formula changes later (for example, adding a
// maximum discount), only applyDiscount needs to change, and every caller keeps working.
console.log("\n--- Using only the method (abstraction) ---");
const offers = [
  { product: laptop, percent: 5 },
  { product: headphones, percent: 50 },
  { product: shoes, percent: 15 },
];
offers.forEach(({ product, percent }) => {
  console.log(`${product.name} at ${percent}% off costs ₹${product.applyDiscount(percent).toFixed(2)}`);
});

console.log("Original price is unchanged:", laptop.price);

try {
  laptop.applyDiscount(150);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
