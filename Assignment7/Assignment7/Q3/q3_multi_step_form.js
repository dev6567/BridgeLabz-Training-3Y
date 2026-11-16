// Q3: Multi-Step Form with Next/Back & Validation

// One entry per step: the input id, a validation function and its error message
const steps = [
  { id: "name", isValid: (v) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(v), message: "Name must contain only alphabets." },
  { id: "email", isValid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), message: "Enter a valid email (example@domain.com)." },
  { id: "password", isValid: (v) => v.length >= 6, message: "Password must be at least 6 characters." },
];

const form = document.getElementById("multi-form");
const stepPanels = document.querySelectorAll(".step");
const backButton = document.getElementById("back-btn");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const summaryBox = document.getElementById("summary");
const summaryList = document.getElementById("summary-list");
const restartButton = document.getElementById("restart-btn");

let currentStep = 0;
const formData = {};         // stores each valid answer

// Show only the current step and update buttons / progress text
function showStep() {
  stepPanels.forEach((panel, index) => panel.classList.toggle("active", index === currentStep));
  backButton.classList.toggle("hidden", currentStep === 0);
  nextButton.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
  progress.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  document.getElementById(steps[currentStep].id).focus();
}

// Validate the input of the current step; show or clear its error
function validateCurrentStep() {
  const step = steps[currentStep];
  const input = document.getElementById(step.id);
  const error = document.getElementById(`${step.id}-error`);
  const value = step.id === "password" ? input.value : input.value.trim();

  const valid = step.isValid(value);
  input.classList.toggle("invalid", !valid);
  error.textContent = valid ? "" : step.message;
  if (valid) formData[step.id] = value;
  return valid;
}

function showSummary() {
  form.style.display = "none";
  progress.textContent = "All steps complete";
  summaryList.innerHTML = "";
  const rows = [
    ["Name", formData.name],
    ["Email", formData.email],
    ["Password", "•".repeat(formData.password.length)],   // never show the real password
  ];
  rows.forEach(([label, value]) => {
    const li = document.createElement("li");
    li.textContent = `${label}: ${value}`;
    summaryList.appendChild(li);
  });
  summaryBox.style.display = "block";
}

// "Next" (also triggered by pressing Enter): move on only if the step is valid
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateCurrentStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  } else {
    showSummary();
  }
});

backButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

// Clear the error as soon as the user edits the field
steps.forEach((step) => {
  document.getElementById(step.id).addEventListener("input", (event) => {
    event.target.classList.remove("invalid");
    document.getElementById(`${step.id}-error`).textContent = "";
  });
});

restartButton.addEventListener("click", () => {
  form.reset();
  Object.keys(formData).forEach((key) => delete formData[key]);
  currentStep = 0;
  summaryBox.style.display = "none";
  form.style.display = "block";
  showStep();
});

showStep();
