// Q6: Employee Management System (Classes + Object Methods)
// salary = monthly salary in rupees

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  // Annual salary = monthly salary x 12
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Increases the monthly salary by the given percentage
  applyBonus(percent) {
    this.salary += (this.salary * percent) / 100;
  }
}

const employees = [
  new Employee(101, "Amit", "Tech", 60000),
  new Employee(102, "Sara", "HR", 40000),
  new Employee(103, "Kiran", "Finance", 55000),
  new Employee(104, "Neha", "Tech", 75000),
  new Employee(105, "Rahul", "Support", 30000),
];

console.log("===== Annual Salaries =====");
employees.forEach((emp) => {
  console.log(`${emp.id} | ${emp.name} (${emp.department}) | Annual: ₹${emp.getAnnualSalary().toFixed(2)}`);
});

// reduce() adds up every employee's annual salary
const totalPayout = employees.reduce((total, emp) => total + emp.getAnnualSalary(), 0);
console.log(`\nTotal annual payout: ₹${totalPayout.toFixed(2)}`);

// Apply a 10% bonus to Sara and recalculate
console.log("\n===== After giving Sara a 10% bonus =====");
employees[1].applyBonus(10);
console.log(`Sara's new monthly salary: ₹${employees[1].salary.toFixed(2)}`);
console.log(`Sara's new annual salary : ₹${employees[1].getAnnualSalary().toFixed(2)}`);
const newTotal = employees.reduce((total, emp) => total + emp.getAnnualSalary(), 0);
console.log(`New total annual payout  : ₹${newTotal.toFixed(2)}`);
