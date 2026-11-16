// Q8: Movie Ticket Booking System

class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

// Inherits MovieTicket and adds a convenience fee
class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// Created BEFORE printTicket exists, to show that prototypes are "live"
const ticket1 = new OnlineTicket("Inception", "A12", 300, 30);

// Add a new method to MovieTicket.prototype
MovieTicket.prototype.printTicket = function () {
  console.log(`Ticket -> Movie: ${this.movieName} | Seat: ${this.seatNo} | Price: ₹${this.price}`);
};

const ticket2 = new OnlineTicket("Interstellar", "B07", 350, 40);
const counterTicket = new MovieTicket("Avatar", "C03", 280);

// printTicket is NOT defined on OnlineTicket, but works through the prototype chain:
// ticket -> OnlineTicket.prototype -> MovieTicket.prototype (printTicket found here)
ticket1.printTicket();
ticket2.printTicket();
counterTicket.printTicket();

console.log(`\n${ticket1.movieName} total amount: ₹${ticket1.getTotalAmount()}`);
console.log(`${ticket2.movieName} total amount: ₹${ticket2.getTotalAmount()}`);

console.log("\n--- Prototype chain proof ---");
console.log("ticket1 has own printTicket?                  :", ticket1.hasOwnProperty("printTicket"));                    // false
console.log("OnlineTicket.prototype has own printTicket?   :", OnlineTicket.prototype.hasOwnProperty("printTicket"));     // false
console.log("MovieTicket.prototype has own printTicket?    :", MovieTicket.prototype.hasOwnProperty("printTicket"));      // true
console.log("Chain: ticket1 -> OnlineTicket.prototype -> MovieTicket.prototype -> Object.prototype -> null");
console.log("1:", Object.getPrototypeOf(ticket1) === OnlineTicket.prototype);
console.log("2:", Object.getPrototypeOf(OnlineTicket.prototype) === MovieTicket.prototype);
