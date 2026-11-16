// Q7: Login Form Validation using RegExp

const usernameRule = { regex: /^.{5,}$/, message: "Username must be at least 5 characters." };

// Each password requirement is checked separately so we can show a specific error
const passwordRules = [
  { regex: /^.{8,}$/, message: "Password must be at least 8 characters." },
  { regex: /\d/, message: "Password must include a number." },
  { regex: /[A-Z]/, message: "Password must include an uppercase letter." },
  { regex: /[a-z]/, message: "Password must include a lowercase letter." },
  { regex: /[^A-Za-z0-9]/, message: "Password must include a special character." },
];

const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorList = document.getElementById("errors");
const successBox = document.getElementById("success");

// Returns an array of error messages (empty array = everything is valid)
function validateLogin(username, password) {
  const errors = [];
  if (!usernameRule.regex.test(username)) {
    errors.push(usernameRule.message);
  }
  passwordRules.forEach((rule) => {
    if (!rule.regex.test(password)) {
      errors.push(rule.message);
    }
  });
  return errors;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = validateLogin(usernameInput.value.trim(), passwordInput.value);

  errorList.innerHTML = "";
  successBox.textContent = "";

  if (errors.length === 0) {
    successBox.textContent = "Login successful!";
  } else {
    errors.forEach((message) => {
      const li = document.createElement("li");
      li.textContent = message;
      errorList.appendChild(li);
    });
  }
});
