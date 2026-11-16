// Q4: Employee Inheritance and Runtime Polymorphism

class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    return `${this.name} (${this.department}) is doing assigned tasks.`;
  }
}

// Manager inherits Employee and OVERRIDES work()
class Manager extends Employee {
  constructor(name, department, teamSize) {
    super(name, department);
    this.teamSize = teamSize;
  }

  work() {
    return `${this.name} (${this.department}) is managing a team of ${this.teamSize} people.`;
  }
}

// Extra subclass to make the polymorphism clearer
class Developer extends Employee {
  work() {
    return `${this.name} (${this.department}) is writing code.`;
  }
}

const employee = new Employee("Amit", "HR");
const manager = new Manager("Sara", "Engineering", 8);
const developer = new Developer("Kiran", "Engineering");

// RUNTIME POLYMORPHISM:
// The array holds different kinds of objects, but every call looks the same: person.work().
// JavaScript decides at RUNTIME which version of work() to run, based on the real object.
const staff = [employee, manager, developer];
staff.forEach((person) => console.log(person.work()));

console.log("\nmanager instanceof Manager :", manager instanceof Manager);
console.log("manager instanceof Employee:", manager instanceof Employee);
console.log("Manager work() is its own   :", Manager.prototype.hasOwnProperty("work"));
