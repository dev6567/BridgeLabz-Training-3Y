"use strict";
// Q2: Employee Bonus Calculator
// "use strict" makes accidental implicit globals (e.g. bonus = 5 without const) throw errors.

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
];

// Extra records only to demonstrate the try...catch error handling
const faultyRecords = [
  { name: "Ravi", salary: "abc", years: "3" },   // cannot convert to number
  { name: "Neha", years: "4" },                   // salary property missing
];

function calculateBonus(employee) {
  if (employee === null || typeof employee !== "object") {
    throw new TypeError("Employee record is missing");
  }
  if (!("salary" in employee) || !("years" in employee)) {
    throw new Error(`${employee.name} is missing the salary or years property`);
  }

  // Step 1: convert strings to numbers
  const salary = Number(employee.salary);
  const years = Number(employee.years);
  if (Number.isNaN(salary) || Number.isNaN(years)) {
    throw new TypeError(`${employee.name}: salary/years cannot be converted to numbers`);
  }

  // Step 2: 10% bonus if more than 3 years, otherwise 5%
  const bonus = years > 3 ? salary * 0.1 : salary * 0.05;
  return { name: employee.name, salary, years, bonus, total: salary + bonus };
}

for (const employee of [...employees, ...faultyRecords]) {
  try {
    const r = calculateBonus(employee);
    console.log(`${r.name} | Salary: ${r.salary.toFixed(2)} | Years: ${r.years} | Bonus: ${r.bonus.toFixed(2)} | Total: ${r.total.toFixed(2)}`);
  } catch (error) {
    console.log(`Error -> ${error.name}: ${error.message}`);
  }
}
