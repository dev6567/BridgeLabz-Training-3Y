// Q9: Form Submit Blocker with preventDefault() and Live Errors

// Each field returns an error message, or "" when the value is valid
const validators = {
  name: (value) => (value.trim() === "" ? "Name is required." : ""),
  email: (value) => {
    if (value.trim() === "") return "Email is required.";
    if (!value.includes("@")) return "Email must contain @.";
    return "";
  },
  password: (value) => (value.length < 6 ? "Password must be at least 6 characters." : ""),
};

const form = document.getElementById("signup-form");
const successMessage = document.getElementById("success");
const fieldNames = Object.keys(validators);

let submitAttempted = false;    // errors for untouched fields appear only after the first submit

// Shows or clears the error of one field; returns true if the field is valid
function checkField(fieldName, showErrors) {
  const input = document.getElementById(fieldName);
  const errorBox = document.getElementById(`${fieldName}-error`);
  const message = validators[fieldName](input.value);

  if (message === "") {
    errorBox.textContent = "";            // corrected input: error disappears automatically
    input.classList.remove("invalid");
  } else if (showErrors) {
    errorBox.textContent = message;
    input.classList.add("invalid");
  }
  return message === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();                 // always stop the real form submission (page reload)
  submitAttempted = true;
  successMessage.textContent = "";

  // Check every field (map, not some/every, so all errors are shown together)
  const results = fieldNames.map((fieldName) => checkField(fieldName, true));

  if (results.every(Boolean)) {
    successMessage.textContent = "Form Submitted Successfully";
    form.reset();
    submitAttempted = false;
  }
});

// Live validation: errors update/disappear while the user types
fieldNames.forEach((fieldName) => {
  document.getElementById(fieldName).addEventListener("input", () => {
    checkField(fieldName, submitAttempted);
  });
});
