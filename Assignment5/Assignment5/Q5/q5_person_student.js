// Q5: Inheritance with constructor functions and prototypes

// ---- Parent: Person ----
function Person(name) {
  this.name = name;
}
Person.prototype.printName = function () {
  console.log(`Name: ${this.name}`);
};

// ---- Child: Student ----
function Student(name, branch) {
  Person.call(this, name);     // run the Person constructor to set this.name
  this.branch = branch;
}

// Link prototypes: Student.prototype -> Person.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;   // fix the constructor reference

Student.prototype.printBranch = function () {
  console.log(`Branch: ${this.branch}`);
};
Student.prototype.printDetails = function () {
  this.printName();      // found up the chain in Person.prototype
  this.printBranch();    // found in Student.prototype
};

const student = new Student("Aarav", "Computer Science");
student.printDetails();

// ---- Show the prototype chain ----
console.log("\nstudent instanceof Student:", student instanceof Student);   // true
console.log("student instanceof Person :", student instanceof Person);     // true
console.log("Chain: student -> Student.prototype -> Person.prototype -> Object.prototype -> null");
console.log("1:", Object.getPrototypeOf(student) === Student.prototype);
console.log("2:", Object.getPrototypeOf(Student.prototype) === Person.prototype);
console.log("3:", Object.getPrototypeOf(Person.prototype) === Object.prototype);
console.log("4:", Object.getPrototypeOf(Object.prototype) === null);
console.log("printName is own property of student?", student.hasOwnProperty("printName")); // false
