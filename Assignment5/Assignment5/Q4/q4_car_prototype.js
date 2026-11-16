// Q4: Constructor function and prototype method sharing

function Car(brand, model) {
  this.brand = brand;   // each car has its OWN brand and model
  this.model = model;
}

// Method is added once to Car.prototype and shared by all Car objects
Car.prototype.getDetails = function () {
  console.log(`Car: ${this.brand} ${this.model}`);
};

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Honda", "City");

car1.getDetails();
car2.getDetails();

// Proof that the method is shared and not copied into each object
console.log("car1.getDetails === car2.getDetails :", car1.getDetails === car2.getDetails);   // true
console.log("car1 has own getDetails?            :", car1.hasOwnProperty("getDetails"));       // false
console.log("Car.prototype has getDetails?       :", Car.prototype.hasOwnProperty("getDetails")); // true
console.log("car1.__proto__ === Car.prototype    :", Object.getPrototypeOf(car1) === Car.prototype); // true
