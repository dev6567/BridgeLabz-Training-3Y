// Q2: Student Form Validator (Forms + RegExp)

// Each rule has a RegExp and the error message to show when it fails
const rules = {
  name: {
    regex: /^[A-Za-z]+(?: [A-Za-z]+)*$/,                 // alphabets only (single spaces between words allowed)
    message: "Name must contain only alphabets.",
  },
  email: {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // example@domain.com
    message: "Enter a valid email (example@domain.com).",
  },
  phone: {
    regex: /^\d{10}$/,                                   // exactly 10 digits
    message: "Phone must be exactly 10 digits.",
  },
  password: {
    // lookaheads check for 1 uppercase, 1 digit and 1 special character
    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    message: "Password needs 1 uppercase letter, 1 number and 1 special character.",
  },
};

const form = document.getElementById("student-form");
const successMessage = document.getElementById("success");
const inputs = Object.keys(rules).map((id) => document.getElementById(id));

// Validates a single input: red border + message if invalid, green if valid
function validateField(input) {
  const rule = rules[input.id];
  const errorBox = document.getElementById(`${input.id}-error`);
  // Do not trim the password, spaces can be part of it
  const value = input.id === "password" ? input.value : input.value.trim();

  let isValid = false;
  if (value === "") {
    errorBox.textContent = "This field is required.";
  } else if (!rule.regex.test(value)) {
    errorBox.textContent = rule.message;
  } else {
    errorBox.textContent = "";
    isValid = true;
  }

  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  return isValid;
}

// Live validation while typing
inputs.forEach((input) => input.addEventListener("input", () => validateField(input)));

// Validate everything on submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = inputs.map(validateField);      // validate all fields (no early exit)
  const allValid = results.every(Boolean);
  successMessage.textContent = allValid ? "Registration successful!" : "";
});
