// Q5: Movie Ticket Booking (Objects + RegExp)

const rules = {
  name: { regex: /^[A-Za-z]+(?: [A-Za-z]+)*$/, message: "Name must contain only alphabets." },
  email: { regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Enter a valid email (example@domain.com)." },
  seats: { regex: /^(?:[1-9]|10)$/, message: "Seats must be a whole number from 1 to 10." },  // 1-9 or 10
};

const form = document.getElementById("booking-form");
const ticketBox = document.getElementById("ticket");
const inputs = Object.keys(rules).map((id) => document.getElementById(id));

function validateField(input) {
  const rule = rules[input.id];
  const errorBox = document.getElementById(`${input.id}-error`);
  const value = input.value.trim();

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

// Shows the ticket using textContent so user input is never treated as HTML
function showTicket(booking) {
  ticketBox.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = "Your Ticket";
  ticketBox.appendChild(title);

  const lines = [
    ["Name", booking.name],
    ["Email", booking.email],
    ["Seats", booking.seats],
  ];
  lines.forEach(([label, value]) => {
    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    ticketBox.appendChild(p);
  });
  ticketBox.style.display = "block";
}

inputs.forEach((input) => input.addEventListener("input", () => validateField(input)));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const allValid = inputs.map(validateField).every(Boolean);

  if (!allValid) {
    ticketBox.style.display = "none";
    return;
  }

  // Store booking info in an object and display it
  const booking = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    seats: Number(document.getElementById("seats").value),
  };
  console.log("Booking:", booking);
  showTicket(booking);
});
