// Q6: E-Commerce Inventory System

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 55000, stock: 5 },
  { id: 2, name: "Headphones", category: "Electronics", price: 1500, stock: 40 },
  { id: 3, name: "T-Shirt", category: "Fashion", price: 800, stock: 3 },
  { id: 4, name: "Jeans", category: "Fashion", price: 2000, stock: 25 },
  { id: 5, name: "Notebook", category: "Stationery", price: 100, stock: 200 },
  { id: 6, name: "Pen Pack", category: "Stationery", price: 50, stock: 8 },
  { id: 7, name: "Blender", category: "Home", price: 3000, stock: 12 },
];

const LOW_STOCK_LIMIT = 10;     // products with stock below this count as low stock

// 1. filter(): keep only products with low stock
function getLowStockProducts(items, limit = LOW_STOCK_LIMIT) {
  return items.filter((product) => product.stock < limit);
}

// 2. sort(): sort by price. A copy is sorted so the original array stays unchanged.
function sortProductsByPrice(items, order = "asc") {
  return [...items].sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price));
}

// 3. reduce(): total value = sum of price x stock
function calculateTotalInventoryValue(items) {
  return items.reduce((total, product) => total + product.price * product.stock, 0);
}

// 4. reduce() + object: { category: [products...] }
function groupByCategory(items) {
  return items.reduce((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = [];       // create the group the first time we see the category
    }
    groups[product.category].push(product);
    return groups;
  }, {});
}

console.log(`--- Low stock products (stock < ${LOW_STOCK_LIMIT}) ---`);
console.table(getLowStockProducts(products), ["id", "name", "category", "stock"]);

console.log("--- Sorted by price (low to high) ---");
console.table(sortProductsByPrice(products), ["name", "price"]);

console.log("--- Sorted by price (high to low), first 3 ---");
console.table(sortProductsByPrice(products, "desc").slice(0, 3), ["name", "price"]);

console.log(`--- Total inventory value: ₹${calculateTotalInventoryValue(products)} ---`);

console.log("\n--- Grouped by category ---");
const grouped = groupByCategory(products);
Object.entries(grouped).forEach(([category, items]) => {
  console.log(`${category}: ${items.map((p) => p.name).join(", ")}`);
});
