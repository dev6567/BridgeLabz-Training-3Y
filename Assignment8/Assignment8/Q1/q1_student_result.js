// Q1: Student Result Processing (reduce + Classes)

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;     // array of subject marks
  }

  // Average = sum of all marks / number of subjects (sum is calculated with reduce)
  calculateAverage() {
    if (!Array.isArray(this.marks) || this.marks.length === 0) {
      throw new Error(`${this.name} has no marks`);
    }
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    return total / this.marks.length;
  }

  // Grade rules: A >= 80, B >= 60, C >= 40, otherwise F
  getGrade() {
    const average = this.calculateAverage();
    if (average >= 80) return "A";
    if (average >= 60) return "B";
    if (average >= 40) return "C";
    return "F";
  }
}

// Test with 3 students
const students = [
  new Student("Aarav", [85, 90, 78, 92, 88]),
  new Student("Priya", [65, 70, 58, 72, 60]),
  new Student("Rohan", [30, 35, 28, 40, 25]),
];

students.forEach((student) => {
  console.log(
    `${student.name}: Marks = [${student.marks.join(", ")}] | Average = ${student.calculateAverage().toFixed(2)} | Grade = ${student.getGrade()}`
  );
});
