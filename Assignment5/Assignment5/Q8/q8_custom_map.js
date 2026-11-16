// Q8: Custom array method myMap()

// defineProperty keeps the new method non-enumerable, so it does not show up in for...in loops
Object.defineProperty(Array.prototype, "myMap", {
  value: function (callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }
    const result = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      if (i in this) {                        // skip empty slots like the built-in map does
        // callback gets (value, index, array), same as map()
        result[i] = callback.call(thisArg, this[i], i, this);
      }
    }
    return result;
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

console.log([1, 2, 3].myMap((num) => num * 2));                       // [2, 4, 6]
console.log(["a", "b"].myMap((item, index) => `${index}:${item}`));   // [ '0:a', '1:b' ]

// Compare with the built-in map()
const numbers = [10, 20, 30];
const custom = numbers.myMap((n) => n + 1);
const builtIn = numbers.map((n) => n + 1);
console.log("myMap  :", custom);
console.log("map    :", builtIn);
console.log("Same result?", JSON.stringify(custom) === JSON.stringify(builtIn));  // true
console.log("Original array unchanged:", numbers);

// Error handling
try {
  [1, 2, 3].myMap("not a function");
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
