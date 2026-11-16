// Q8: Dynamic Object Updater
const user = { name: "John", email: "john@mail.com", age: 21 };

const form = document.getElementById("user-form");
const objectView = document.getElementById("object-view");
const detailsList = document.getElementById("details");
const statusBox = document.getElementById("status");
const inputs = form.querySelectorAll("input[data-key]");

// Redraws the object and its details on the page
function renderUser() {
  objectView.textContent = JSON.stringify(user, null, 2);

  detailsList.innerHTML = "";
  Object.entries(user).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;      // textContent keeps user input safe
    detailsList.appendChild(li);
  });
}

// Fill the form with the current values
inputs.forEach((input) => {
  input.value = user[input.dataset.key];
});

// Real-time update: the object changes on every keystroke
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const key = input.dataset.key;
    // Age is stored as a Number (empty box stays an empty string)
    user[key] = key === "age" && input.value !== "" ? Number(input.value) : input.value;
    statusBox.textContent = "";
    renderUser();
  });
});

// Submit also updates and confirms
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderUser();
  statusBox.textContent = "User updated!";
  console.log("Updated user:", user);
});

renderUser();
