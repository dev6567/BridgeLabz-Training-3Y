// Q9: Person -> Student with ES6 classes vs prototypes

// ======== Prototype version ========
function ProtoPerson(name) {
  this.name = name;
}
ProtoPerson.prototype.printName = function () {
  return `Name: ${this.name}`;
};

function ProtoStudent(name, branch) {
  ProtoPerson.call(this, name);
  this.branch = branch;
}
ProtoStudent.prototype = Object.create(ProtoPerson.prototype);
ProtoStudent.prototype.constructor = ProtoStudent;
ProtoStudent.prototype.printBranch = function () {
  return `Branch: ${this.branch}`;
};

// ======== ES6 class version ========
class ClassPerson {
  constructor(name) {
    this.name = name;
  }
  printName() {
    return `Name: ${this.name}`;
  }
}

class ClassStudent extends ClassPerson {
  constructor(name, branch) {
    super(name);          // calls the parent constructor (like Person.call(this, name))
    this.branch = branch;
  }
  printBranch() {
    return `Branch: ${this.branch}`;
  }
}

// ======== Compare behaviour ========
const protoStudent = new ProtoStudent("Aarav", "Computer Science");
const classStudent = new ClassStudent("Aarav", "Computer Science");

console.log("Prototype version:", protoStudent.printName(), "|", protoStudent.printBranch());
console.log("Class version    :", classStudent.printName(), "|", classStudent.printBranch());

console.log("\nSame output?",
  protoStudent.printName() === classStudent.printName() &&
  protoStudent.printBranch() === classStudent.printBranch());   // true

console.log("\n--- Prototype chain checks ---");
console.log("Proto: instanceof Student/Person:", protoStudent instanceof ProtoStudent, protoStudent instanceof ProtoPerson);
console.log("Class: instanceof Student/Person:", classStudent instanceof ClassStudent, classStudent instanceof ClassPerson);
console.log("Proto: Student.prototype -> Person.prototype:", Object.getPrototypeOf(ProtoStudent.prototype) === ProtoPerson.prototype);
console.log("Class: Student.prototype -> Person.prototype:", Object.getPrototypeOf(ClassStudent.prototype) === ClassPerson.prototype);
console.log("Methods shared (not copied)?",
  Object.getPrototypeOf(protoStudent).printBranch === ProtoStudent.prototype.printBranch,
  Object.getPrototypeOf(classStudent).printBranch === ClassStudent.prototype.printBranch);
console.log("typeof class:", typeof ClassStudent, "(a class is just a function, so classes are syntax on top of prototypes)");
