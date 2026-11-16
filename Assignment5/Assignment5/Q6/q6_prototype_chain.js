// Q6: Prototype chain  Person -> Faculty -> Professor

// ---- Person ----
function Person(name) {
  this.name = name;
}
Person.prototype.introduce = function () {
  console.log(`Hi, I am ${this.name}.`);
};

// ---- Faculty inherits Person ----
function Faculty(name, department) {
  Person.call(this, name);
  this.department = department;
}
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.teach = function () {
  console.log(`${this.name} teaches in the ${this.department} department.`);
};

// ---- Professor inherits Faculty ----
function Professor(name, department, researchArea) {
  Faculty.call(this, name, department);   // runs Faculty, which runs Person
  this.researchArea = researchArea;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.publishPaper = function () {
  console.log(`${this.name} published a paper on ${this.researchArea}.`);
};

const professor = new Professor("Dr. Sharma", "Computer Science", "Artificial Intelligence");

// The professor object can use methods from every level of the chain
professor.introduce();     // from Person.prototype
professor.teach();         // from Faculty.prototype
professor.publishPaper();  // from Professor.prototype

// Show the chain
console.log("\nChain: professor -> Professor.prototype -> Faculty.prototype -> Person.prototype -> Object.prototype -> null");
console.log("instanceof Professor:", professor instanceof Professor);
console.log("instanceof Faculty  :", professor instanceof Faculty);
console.log("instanceof Person   :", professor instanceof Person);
console.log("Own properties      :", Object.keys(professor));
