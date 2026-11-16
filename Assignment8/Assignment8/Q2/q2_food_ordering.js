// Q2: Online Food Ordering (map + Error Handling)

const menu = [
  { item: "Burger", price: 120 },
  { item: "Pizza", price: 250 },
  { item: "Pasta", price: 180 },
  { item: "Fries", price: 90 },
  { item: "Coke", price: 60 },
];

function calculateBill(orderItems) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("Order is empty. Please select at least one item.");
  }

  // map(): turn each ordered item name into its price
  const prices = orderItems.map((orderedName) => {
    const menuEntry = menu.find((entry) => entry.item.toLowerCase() === String(orderedName).toLowerCase());
    if (!menuEntry) {
      // An error thrown inside map() stops the whole calculation
      throw new Error(`Invalid item: "${orderedName}" is not on the menu.`);
    }
    return menuEntry.price;
  });

  // reduce(): add up all the prices
  const total = prices.reduce((sum, price) => sum + price, 0);
  return { prices, total };
}

// Helper that runs an order and shows a meaningful message
function placeOrder(orderItems) {
  try {
    const { prices, total } = calculateBill(orderItems);
    console.log(`Order: ${orderItems.join(", ")}`);
    console.log(`Prices: [${prices.join(", ")}]  ->  Total bill: ₹${total}`);
  } catch (error) {
    console.log(`Could not place order: ${error.message}`);
  }
  console.log("");
}

placeOrder(["Burger", "Fries", "Coke"]);       // valid
placeOrder(["pizza", "PASTA"]);                // valid (not case sensitive)
placeOrder(["Burger", "Noodles"]);             // invalid item
placeOrder([]);                                // empty order
