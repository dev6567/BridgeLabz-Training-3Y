// Q9: Fitness App Analytics

class FitnessAnalytics {
  constructor(data) {
    // Throw an error if the dataset is missing or empty
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Dataset is empty. Cannot run analytics.");
    }
    this.data = data;
  }

  // filter(): users with more than 7000 steps
  getActiveUsers() {
    return this.data.filter((entry) => entry.steps > 7000);
  }

  // reduce(): total calories / number of users
  getAverageCalories() {
    const totalCalories = this.data.reduce((sum, entry) => sum + entry.calories, 0);
    return totalCalories / this.data.length;
  }

  // map(): format every entry as a message
  getUserSummary() {
    return this.data.map(
      (entry) => `User ${entry.user} walked ${entry.steps} steps and burned ${entry.calories} calories.`
    );
  }
}

const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 },
];

const analytics = new FitnessAnalytics(workoutData);

console.log("--- Active users (steps > 7000) ---");
analytics.getActiveUsers().forEach((entry) => console.log(`User ${entry.user}: ${entry.steps} steps`));

console.log("\n--- Average calories ---");
console.log(`${analytics.getAverageCalories().toFixed(2)} calories`);

console.log("\n--- User summary ---");
analytics.getUserSummary().forEach((message) => console.log(message));

// Empty dataset must throw an error
console.log("\n--- Empty dataset test ---");
try {
  new FitnessAnalytics([]);
} catch (error) {
  console.log(`Error: ${error.message}`);
}
