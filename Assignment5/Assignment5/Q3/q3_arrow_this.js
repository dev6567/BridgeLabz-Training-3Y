// Q3: Arrow function vs normal function and `this`

// ---- Version 1: arrow function as a method (the problem) ----
const userWithArrow = {
  name: "Aarav",
  showName: () => {
    // Arrow functions do NOT have their own `this`. They use the `this` of the place
    // where they were written. Here that is the top level of the file, not the object.
    // In Node (CommonJS) top-level `this` is an empty object {} (module.exports),
    // so this.name is undefined. In a browser it would be window.name, which is "".
    console.log(`Arrow function: this.name = ${this.name}`);
  },
};
userWithArrow.showName();   // Arrow function: this.name = undefined

// ---- Version 2: normal function as a method (the fix) ----
const userWithNormal = {
  name: "Aarav",
  showName: function () {
    // A normal function gets `this` from HOW it is called.
    // userWithNormal.showName() -> the object before the dot becomes `this`.
    console.log(`Normal function: this.name = ${this.name}`);
  },
};
userWithNormal.showName();  // Normal function: this.name = Aarav

// Shorthand method syntax also works the same way as a normal function
const userShorthand = {
  name: "Aarav",
  showName() {
    console.log(`Shorthand method: this.name = ${this.name}`);
  },
};
userShorthand.showName();
