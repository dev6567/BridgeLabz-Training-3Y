// Q1: Scope Conflict Resolver

// Global variable: visible everywhere in the script
const bonus = 5000;

function calculateSalary(isPermanent) {
  // Local variables: exist only inside this function
  const salary = 40000;
  let totalSalary = salary;

  // Bonus is added only for permanent employees
  if (isPermanent) {
    totalSalary += bonus;                // function can read the global bonus
  }

  console.log(`isPermanent = ${isPermanent} -> Total salary: ${totalSalary}`);
}

// Changing isPermanent changes only the local result; the global bonus stays the same
calculateSalary(true);                   // 40000 + 5000
console.log(`Global bonus after call: ${bonus}`);
calculateSalary(false);                  // 40000 only
console.log(`Global bonus after call: ${bonus}`);

// Local variables cannot be accessed outside the function
console.log(`typeof salary outside function: ${typeof salary}`);       // undefined
console.log(`typeof isPermanent outside function: ${typeof isPermanent}`); // undefined
