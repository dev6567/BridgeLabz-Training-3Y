// Q5: Ride-Sharing Application

class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }
}

// Driver inherits User and adds vehicle details
class Driver extends User {
  constructor(name, rating, vehicleModel, vehicleNumber) {
    super(name, rating);
    this.vehicle = { model: vehicleModel, number: vehicleNumber };
  }
}

class Trip {
  constructor(fromLocation, toLocation, distance) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;    // in km
  }

  // Fare = base fare + rate per km
  calculateFare() {
    const BASE_FARE = 50;
    const RATE_PER_KM = 12;

    // Reject missing, non-numeric and negative distances
    if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || Number.isNaN(this.distance)) {
      throw new Error("Distance is required and must be a number.");
    }
    if (this.distance < 0) {
      throw new Error("Distance cannot be negative.");
    }
    return BASE_FARE + this.distance * RATE_PER_KM;
  }
}

const rider = new User("Neha", 4.8);
const driver = new Driver("Ravi", 4.9, "Maruti Swift", "UP85 AB 1234");
console.log(`Rider : ${rider.name} (rating ${rider.rating})`);
console.log(`Driver: ${driver.name} (rating ${driver.rating}) | ${driver.vehicle.model}, ${driver.vehicle.number}`);
console.log("");

function showFare(trip) {
  try {
    console.log(`${trip.fromLocation} -> ${trip.toLocation}: Fare = ₹${trip.calculateFare()}`);
  } catch (error) {
    console.log(`${trip.fromLocation} -> ${trip.toLocation}: Could not calculate fare. ${error.message}`);
  }
}

showFare(new Trip("Mathura", "Vrindavan", 12));      // valid
showFare(new Trip("Mathura", "Agra", -5));           // negative
showFare(new Trip("Mathura", "Delhi"));              // distance not provided
showFare(new Trip("Mathura", "Jaipur", "abc"));      // not a number
