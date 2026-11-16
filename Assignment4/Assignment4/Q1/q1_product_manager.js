// Q1: E-Commerce Product Manager (Classes + Objects)

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Reduces the price by the given percentage and updates the product
  applyDiscount(percent) {
    const discountAmount = (this.price * percent) / 100;
    this.price = this.price - discountAmount;
    return this.price;
  }

  // Returns a formatted string with the product details
  getDetails() {
    return `#${this.id} | ${this.name} | Category: ${this.category} | Price: ₹${this.price.toFixed(2)}`;
  }
}

// Create multiple product objects and store them in an array
const products = [
  new Product(1, "Laptop", 55000, "Electronics"),
  new Product(2, "Headphones", 1500, "Electronics"),
  new Product(3, "T-Shirt", 799, "Fashion"),
  new Product(4, "Smartphone", 18000, "Electronics"),
  new Product(5, "Notebook", 120, "Stationery"),
  new Product(6, "Running Shoes", 2999, "Fashion"),
];

console.log("===== All Products =====");
products.forEach((product) => console.log(product.getDetails()));

// Filter products with price > 1000
const expensiveProducts = products.filter((product) => product.price > 1000);
console.log("\n===== Products with price > 1000 =====");
expensiveProducts.forEach((product) => console.log(product.getDetails()));

// Apply a 10% discount to one product and show the result
console.log("\n===== Applying 10% discount to Headphones =====");
products[1].applyDiscount(10);
console.log(products[1].getDetails());
