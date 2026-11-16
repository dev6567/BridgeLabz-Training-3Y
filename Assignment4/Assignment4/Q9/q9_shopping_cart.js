// Q9: Shopping Cart Total (Classes + RegExp for Coupon)

class Cart {
  constructor() {
    this.items = [];
    this.discountPercent = 0;
  }

  // Adds an item to the cart
  addItem(name, price, quantity) {
    this.items.push({ name, price, quantity });
  }

  // Total before any coupon
  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Coupon format: SAVE or DISC followed by exactly 2 digits (SAVE20, DISC10).
  // The 2 digits are the discount percentage.
  applyCoupon(code) {
    const couponRegex = /^(SAVE|DISC)(\d{2})$/;
    const cleanedCode = code.trim().toUpperCase();
    const match = cleanedCode.match(couponRegex);

    if (!match) {
      this.discountPercent = 0;
      return false;
    }
    this.discountPercent = Number(match[2]);   // second capture group = the digits
    return true;
  }

  getFinalTotal() {
    const total = this.getTotal();
    return total - (total * this.discountPercent) / 100;
  }

  printSummary() {
    this.items.forEach((item) => {
      console.log(`${item.name} x${item.quantity} @ ₹${item.price} = ₹${item.price * item.quantity}`);
    });
    console.log(`Total          : ₹${this.getTotal().toFixed(2)}`);
    console.log(`Discount       : ${this.discountPercent}%`);
    console.log(`Final total    : ₹${this.getFinalTotal().toFixed(2)}`);
  }
}

const cart = new Cart();
cart.addItem("Keyboard", 1200, 1);
cart.addItem("Mouse", 500, 2);
cart.addItem("USB Cable", 150, 3);

console.log("===== Cart =====");
cart.printSummary();

// Try different coupons
const couponsToTry = ["SAVE20", "DISC10", "save15", "FREE50", "SAVE5", "SAVE200"];
couponsToTry.forEach((code) => {
  console.log(`\n--- Coupon "${code}" ---`);
  if (cart.applyCoupon(code)) {
    console.log(`Valid coupon! ${cart.discountPercent}% discount applied.`);
    console.log(`Final total: ₹${cart.getFinalTotal().toFixed(2)}`);
  } else {
    console.log("Invalid coupon format. Use SAVE20 or DISC10 style codes.");
  }
});
